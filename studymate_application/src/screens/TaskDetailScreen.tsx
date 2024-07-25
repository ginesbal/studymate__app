import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { TaskDetailRouteProp, TaskDetailNavigationProp } from '../types';

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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.description}>{task.description}</Text>
            <Text>Due Date: {task.dueDate}</Text>
            <Text>Reminder Time: {task.reminderTime}</Text>
            <Button title="Mark as Complete" onPress={() => { }} color="#283618" />
            <Button title="Edit Task" onPress={() => navigation.navigate('AddTaskScreen', { id: task.id })} color="#283618" />
            <Button title="Delete Task" onPress={() => { }} color="#283618" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F0EFEB',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#283618',
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        color: '#283618',
    },
});

export default TaskDetailScreen;
