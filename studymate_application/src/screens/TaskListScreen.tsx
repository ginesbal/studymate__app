import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TaskDetailNavigationProp } from '../types';
import tasksData from '../data/tasks.json';
import Button from '../components/ui/Button'; // Assuming you have a custom Button component

type Task = {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    reminderTime: string;
    completed: boolean;
};

const TaskListScreen: React.FC = () => {
    const navigation = useNavigation<TaskDetailNavigationProp>();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const savedTasks = await AsyncStorage.getItem('tasks');
                if (savedTasks) {
                    setTasks(JSON.parse(savedTasks));
                } else {
                    await AsyncStorage.setItem('tasks', JSON.stringify(tasksData));
                    setTasks(tasksData);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const groupTasksByDate = (tasks: Task[]) => {
        return tasks.reduce((acc, task) => {
            const date = task.dueDate;
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(task);
            return acc;
        }, {} as { [key: string]: Task[] });
    };

    const handleConfirmDate = (date: Date) => {
        setSelectedDate(date.toISOString().split('T')[0]);
        setDatePickerVisibility(false);
    };

    const groupedTasks = groupTasksByDate(tasks);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2ea789" />
            </View>
        );
    }

    const getDayOfWeek = (dateString: string) => {
        const date = new Date(dateString);
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return days[date.getUTCDay()];
    };

    const getFormattedDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString('en-US', { month: 'short' })} ${date.getFullYear()}`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.dateText}>{new Date(selectedDate).getDate()}</Text>
                <View style={styles.dateInfo}>
                    <Text style={styles.dayText}>{getDayOfWeek(selectedDate)}</Text>
                    <Text style={styles.monthText}>{getFormattedDate(selectedDate)}</Text>
                </View>
                <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={styles.todayButton}>
                    <Text style={styles.todayText}>Today</Text>
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
            <ScrollView contentContainerStyle={styles.content}>
                {groupedTasks[selectedDate] ? (
                    groupedTasks[selectedDate].map(task => (
                        <View key={task.id} style={styles.taskContainer}>
                            <Text style={styles.taskTitle}>{task.title}</Text>
                            <Text style={styles.taskDescription}>{task.description}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.emptyMessage}>
                        No tasks for this date. Tap 'Add New Task' to get started.
                    </Text>
                )}
                <Button
                    title="Add New Task"
                    onPress={() => navigation.navigate('AddTaskScreen', { id: undefined })}
                    style={styles.addButton}
                    textStyle={styles.addButtonText}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faf9f9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 32,
        marginHorizontal: 20,
        marginTop: 20,
    },
    dateText: {
        fontSize: 50,
        color: '#202525',
        fontFamily: 'Poppins-Bold',
        marginRight: 20,
    },
    dateInfo: {
        flex: 1,
    },
    dayText: {
        fontSize: 18,
        color: '#444472',
        fontFamily: 'Poppins-SemiBold',
    },
    monthText: {
        fontSize: 18,
        color: '#444472',
        fontFamily: 'Poppins-SemiBold',
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
    content: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    taskContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    taskTitle: {
        fontSize: 16,
        color: '#202525',
        fontFamily: 'Poppins-SemiBold',
    },
    taskDescription: {
        fontSize: 14,
        color: '#88889d',
        fontFamily: 'Poppins-Regular',
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
    emptyMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32,
        color: '#88889d',
    },
});

export default TaskListScreen;
