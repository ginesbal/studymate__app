import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TaskDetailNavigationProp } from '../types';

type Task = {
    id: string;
    title: string;
};

const TaskList: React.FC = () => {
    const navigation = useNavigation<TaskDetailNavigationProp>();

    const tasks: Task[] = [
    { id: '1', title: 'Task 1' },
    { id: '2', title: 'Task 2' },
];

const renderItem = ({ item }: { item: Task }) => (
    <TouchableOpacity
    style={styles.taskItem}
    onPress={() => navigation.navigate('TaskDetail', { id: item.id })}
    >
        <Text style={styles.taskText}>{item.title}</Text>
    </TouchableOpacity>
    );
    
    return (
    <View style={styles.container}>
        <Text style={styles.title}>Task List</Text>
        <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        />
        <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTask', { id: undefined })}
        >
            <Text style={styles.addButtonText}>Add New Task</Text>
            </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#333',
    },
    listContent: {
        paddingBottom: 16,
    },
    taskItem: {
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        cursor: 'pointer',
    },
    taskText: {
        fontSize: 18,
        color: '#333',
    },
    addButton: {
        backgroundColor: '#007BFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default TaskList;
