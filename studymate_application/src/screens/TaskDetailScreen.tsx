// src/screens/TaskDetailScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { TaskDetailScreenRouteProp, TaskDetailScreenNavigationProp, Task } from '../types';

const TaskDetailScreen: React.FC = () => {
    const route = useRoute<TaskDetailScreenRouteProp>();
    const navigation = useNavigation<TaskDetailScreenNavigationProp>();
    const { id } = route.params;

    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadTask = async () => {
            try {
                const savedTasks = await AsyncStorage.getItem('tasks');
                if (savedTasks) {
                    const tasks: Task[] = JSON.parse(savedTasks);
                    const foundTask = tasks.find(task => task.id === id);
                    if (foundTask) {
                        setTask(foundTask);
                    }
                }
                setLoading(false);
            } catch (error) {
                console.error('Error loading task:', error);
                setLoading(false);
            }
        };

        loadTask();
    }, [id]);

    const handleDeleteTask = async () => {
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
                            const savedTasks = await AsyncStorage.getItem('tasks');
                            if (savedTasks) {
                                const tasks: Task[] = JSON.parse(savedTasks);
                                const updatedTasks = tasks.filter(task => task.id !== id);
                                await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
                                navigation.goBack();
                            }
                        } catch (error) {
                            console.error('Error deleting task:', error);
                        }
                    }
                }
            ]
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3A86FF" />
            </View>
        );
    }

    if (!task) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Task not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.description}>{task.description}</Text>
            <Text style={styles.dueDate}>Due Date: {task.dueDate}</Text>
            <Text style={styles.reminderTime}>Reminder Time: {task.reminderTime}</Text>
            <TouchableOpacity style={styles.button} onPress={() => { /* Logic to mark as complete */ }}>
                <Text style={styles.buttonText}>Mark as Complete</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('AddTaskScreen', { id: task.id })}
            >
                <Text style={styles.buttonText}>Edit Task</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteTask}>
                <Text style={styles.deleteButtonText}>Delete Task</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F8F8F8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#1E1E2E',
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        color: '#1E1E2E',
    },
    dueDate: {
        fontSize: 16,
        marginBottom: 10,
        color: '#1E1E2E',
    },
    reminderTime: {
        fontSize: 16,
        marginBottom: 20,
        color: '#1E1E2E',
    },
    button: {
        backgroundColor: '#3A86FF',
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: '#DC3545',
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    deleteButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: '#1E1E2E',
    },
});

export default TaskDetailScreen;
