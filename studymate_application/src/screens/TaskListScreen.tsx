import React, { useEffect, useContext, useState } from 'react';
import { View, Text, SectionList, ActivityIndicator, StyleSheet, TouchableOpacity, StatusBar, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Task, RootStackParamList } from '../types';
import Button from '../components/ui/Button';
import { groupTasksByDate } from '../utils/groupTasksByDate';
import { TasksContext } from '../context/TasksContext';
import { useTheme } from '../context/ThemeContext';

type TaskListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TaskListScreen'>;

const TaskListScreen: React.FC = () => {
    const { theme } = useTheme();
    const navigation = useNavigation<TaskListScreenNavigationProp>();
    const context = useContext(TasksContext);

    if (!context) {
        throw new Error("TasksContext is undefined, make sure you are using the TasksProvider");
    }

    const { tasks, setTasks } = context;
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const savedTasks = await AsyncStorage.getItem('tasks');
                if (savedTasks) {
                    setTasks(JSON.parse(savedTasks));
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                setLoading(false);
            }
        };

        fetchTasks();
    }, [setTasks]);

    const handleConfirmDate = (date: Date) => {
        setSelectedDate(date.toISOString().split('T')[0]);
        setDatePickerVisibility(false);
    };

    const handleDeleteTask = async (taskId: string) => {
        Alert.alert(
            "Delete Task",
            "Are you sure you want to delete this task?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const updatedTasks = tasks.filter(task => task.id !== taskId);
                            await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
                            setTasks(updatedTasks);
                        } catch (error) {
                            console.error('Error deleting task:', error);
                        }
                    }
                }
            ]
        );
    };

    const groupedTasks = groupTasksByDate(tasks);
    const sections = Object.keys(groupedTasks).map(date => ({
        title: date,
        data: groupedTasks[date],
    }));

    const renderTaskItem = ({ item }: { item: Task }) => (
        <TouchableOpacity onPress={() => navigation.navigate('TaskDetailScreen', { id: item.id })}>
            <View style={[styles.taskContainer, { backgroundColor: theme.buttonBackground }]}>
                <View style={styles.taskContent}>
                    <View style={[styles.dateCircle, { backgroundColor: theme.primaryColor }]}>
                        <Text style={[styles.dateText, { color: theme.buttonTextColor }]}>{new Date(item.dueDate).getDate()}</Text>
                    </View>
                    <View>
                        <Text style={[styles.taskTitle, { color: theme.textColor }]} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
                        <Text style={[styles.taskSubtitle, { color: theme.textColor }]}>{item.description}</Text>
                    </View>
                    <TouchableOpacity onPress={() => handleDeleteTask(item.id)} style={[styles.deleteButton, { backgroundColor: theme.secondaryColor }]}>
                        <Text style={[styles.deleteButtonText, { color: theme.buttonTextColor }]}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor: theme.backgroundColor }]}>
                <ActivityIndicator size="large" color={theme.primaryColor} />
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.backgroundColor} />
            <View style={styles.headerContainer}>
                <Text style={[styles.headerTitle, { color: theme.textColor }]}>Your Tasks</Text>
                <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={[styles.todayButton, { backgroundColor: theme.primaryColor }]}>
                    <Text style={[styles.todayText, { color: theme.buttonTextColor }]}>Select Date</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.dateRow}>
                {Array.from({ length: 7 }).map((_, index) => {
                    const date = new Date(new Date(selectedDate).setDate(new Date(selectedDate).getDate() - new Date(selectedDate).getDay() + index));
                    const dateString = date.toISOString().split('T')[0];
                    const isSelected = selectedDate === dateString;
                    return (
                        <TouchableOpacity key={index} style={styles.dateBox} onPress={() => setSelectedDate(dateString)}>
                            <Text style={[styles.dayLabel, { color: theme.textColor }]}>{getDayOfWeek(dateString).charAt(0)}</Text>
                            <Text style={[styles.dateLabel, { color: isSelected ? theme.buttonTextColor : theme.textColor, backgroundColor: isSelected ? theme.primaryColor : theme.backgroundColor }]}>{date.getDate()}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmDate}
                onCancel={() => setDatePickerVisibility(false)}
            />
            <SectionList
                sections={sections}
                renderItem={renderTaskItem}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={() => (
                    <View style={styles.scheduleHeader}>
                        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Your Schedule</Text>
                    </View>
                )}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={() => (
                    <Text style={[styles.emptyMessage, { color: theme.textColor }]}>
                        No tasks for this date. Tap 'Add New Task' to get started.
                    </Text>
                )}
            />
            <Button
                title="Add New Task"
                onPress={() => navigation.navigate('AddTaskScreen', { id: undefined })}
                style={styles.addButton}
                textStyle={styles.addButtonText}
            />
        </View>
    );
};

const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getUTCDay()];
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    todayButton: {
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    todayText: {
        fontSize: 16,
        fontWeight: '600',
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    dateBox: {
        alignItems: 'center',
    },
    dayLabel: {
        fontSize: 14,
        fontWeight: '500',
    },
    dateLabel: {
        fontSize: 16,
        fontWeight: '600',
        borderRadius: 10,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    scheduleHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    listContent: {
        paddingBottom: 20,
    },
    taskContainer: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    taskContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    taskSubtitle: {
        fontSize: 14,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton: {
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        marginTop: 20,
    },
    addButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    deleteButton: {
        marginLeft: 'auto',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    deleteButtonText: {
        fontSize: 14,
    },
    emptyMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32,
    },
});

export default TaskListScreen;
