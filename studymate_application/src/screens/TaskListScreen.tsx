// src/screens/TaskListScreen.tsx

import React, { useEffect, useContext, useState } from 'react';
import { View, Text, SectionList, ActivityIndicator, StyleSheet, TouchableOpacity, StatusBar, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import DateTimePickerModal from "react-native-modal-datetime-picker";  // Add this import
import { Task, RootStackParamList } from '../types';
import Button from '../components/ui/Button';
import { groupTasksByDate } from '../utils/groupTasksByDate';
import { TasksContext } from '../context/TasksContext';

type TaskListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TaskListScreen'>;

const TaskListScreen: React.FC = () => {
    const navigation = useNavigation<TaskListScreenNavigationProp>();
    const context = useContext(TasksContext);

    if (!context) {
        throw new Error("TasksContext is undefined, make sure you are using the TasksProvider");
    }

    const { tasks, addNewTask, setTasks } = context;
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
            <View style={styles.taskContainer}>
                <View style={styles.taskContent}>
                    <View style={styles.dateCircle}>
                        <Text style={styles.dateText}>{new Date(item.dueDate).getDate()}</Text>
                    </View>
                    <View>
                        <Text style={styles.taskTitle} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
                        <Text style={styles.taskSubtitle}>{item.description}</Text>
                    </View>
                    <TouchableOpacity onPress={() => handleDeleteTask(item.id)} style={styles.deleteButton}>
                        <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3A86FF" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8F8F8" />
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Your Tasks</Text>
                <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={styles.todayButton}>
                    <Text style={styles.todayText}>Select Date</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.dateRow}>
                {Array.from({ length: 7 }).map((_, index) => {
                    const date = new Date(new Date(selectedDate).setDate(new Date(selectedDate).getDate() - new Date(selectedDate).getDay() + index));
                    const dateString = date.toISOString().split('T')[0];
                    const isSelected = selectedDate === dateString;
                    return (
                        <TouchableOpacity key={index} style={styles.dateBox} onPress={() => setSelectedDate(dateString)}>
                            <Text style={styles.dayLabel}>{getDayOfWeek(dateString).charAt(0)}</Text>
                            <Text style={[styles.dateLabel, isSelected && styles.activeDateLabel]}>{date.getDate()}</Text>
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
                        <Text style={styles.sectionTitle}>Your Schedule</Text>
                    </View>
                )}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyMessage}>
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
        backgroundColor: '#F8F8F8',
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
        color: '#1E1E2E',
    },
    todayButton: {
        backgroundColor: '#4dc591',
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    todayText: {
        color: '#ffffff',
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
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
        color: '#bcc1cd',
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
    },
    dateLabel: {
        color: '#202525',
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
    },
    activeDateLabel: {
        color: '#ffffff',
        backgroundColor: '#ff7648',
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
        color: '#1E1E2E',
    },
    listContent: {
        paddingBottom: 20,
    },
    taskContainer: {
        backgroundColor: '#FFFFFF',
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
        backgroundColor: '#3A86FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    dateText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#202525',
    },
    taskSubtitle: {
        fontSize: 14,
        color: '#88889d',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: '#2ea789',
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
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    deleteButton: {
        marginLeft: 'auto',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#ff6347',
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#fff',
    },
    emptyMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32,
        color: '#88889d',
    },
});

export default TaskListScreen;
