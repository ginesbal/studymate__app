import React from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { TaskDetailRouteProp, TaskDetailNavigationProp } from '../types';
import Button from '../components/ui/Button';

const TaskDetailScreen: React.FC = () => {
    const route = useRoute<TaskDetailRouteProp>();
    const navigation = useNavigation<TaskDetailNavigationProp>();
    const { id } = route.params;

    // Load task details using id (logic to be implemented)
    const task = {
        id,
        title: 'Sample Task Title',
        description: 'Sample Task Description',
        dueDate: '2023-12-31',
        reminderTime: '08:00',
    };

    const handleDeleteTask = () => {
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
                    onPress: () => {
                        // Logic to delete the task
                        navigation.goBack();
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.description}>{task.description}</Text>
            <Text style={styles.dueDate}>Due Date: {task.dueDate}</Text>
            <Text style={styles.reminderTime}>Reminder Time: {task.reminderTime}</Text>
            <TouchableOpacity style={styles.button} onPress={() => { /* Logic to mark as complete */ }}>
                <Text style={styles.buttonText}>Mark as Complete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddTaskScreen', { id: task.id })}>
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
});

export default TaskDetailScreen;
