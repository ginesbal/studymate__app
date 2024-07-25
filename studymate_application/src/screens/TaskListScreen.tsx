import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TaskItem from '../components/ui/TaskItem';
import Button from '../components/ui/Button';
import { TaskDetailNavigationProp } from '../types';
import tasksData from '../data/tasks.json';

type Task = {
    id: string;
    title: string;
};

const TaskListScreen: React.FC = () => {
    const navigation = useNavigation<TaskDetailNavigationProp>();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                // Simulate a network request delay
                setTimeout(() => {
                    setTasks(tasksData);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const renderItem = ({ item }: { item: Task }) => (
        <TaskItem
            title={item.title}
            onPress={() => navigation.navigate('TaskDetailScreen', { id: item.id })}
        />
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Task List</Text>
            {tasks.length > 0 ? (
                <FlatList
                    data={tasks}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                />
            ) : (
                <Text style={styles.emptyMessage}>
                    You have no tasks yet. Tap 'Add New Task' to get started.
                </Text>
            )}

            <Button
                title="Add New Task"
                onPress={() => navigation.navigate('AddTaskScreen', { id: undefined })}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F0EFEB',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#283618',
    },
    listContent: {
        paddingBottom: 16,
    },
    emptyMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32,
        color: '#777',
    },
});

export default TaskListScreen;
