import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type TaskItemProps = {
    title: string;
    dueDate: string;
    completed: boolean;
    onPress: () => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ title, dueDate, completed, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.taskContent}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.dueDate}>Due: {dueDate}</Text>
            </View>
            {completed ? (
                <Text style={styles.completed}>Completed</Text>
            ) : (
                <Text style={styles.incomplete}>Incomplete</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    taskContent: {
        flexDirection: 'column',
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E1E2E',
    },
    dueDate: {
        fontSize: 14,
        color: '#777',
    },
    completed: {
        color: '#28A745',
        fontSize: 14,
        textAlign: 'right',
    },
    incomplete: {
        color: '#DC3545',
        fontSize: 14,
        textAlign: 'right',
    },
});

export default TaskItem;
