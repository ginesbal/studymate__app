import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    ActivityIndicator, FlatList,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import TaskItem from '../components/ui/TaskItem';
import { RootStackParamList, Task } from '../types';
import { groupTasksByDate } from '../utils/groupTasksByDate';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC = () => {
    const { theme } = useTheme();
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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
    }, []);

    const addNewTask = useCallback((newTask: Task) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    }, []);

    const groupedTasks = useMemo(() => groupTasksByDate(tasks), [tasks]);

    const sections = useMemo(() => Object.keys(groupedTasks).map(date => ({
        title: date,
        data: groupedTasks[date],
    })), [groupedTasks]);

    const getGreeting = useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning! 🌅';
        if (hour < 18) return 'Good afternoon! ☀️';
        return 'Good evening! 🌆';
    }, []);

    const renderTaskItem = useCallback(({ item }: { item: Task }) => (
        <TaskItem
            title={item.title}
            dueDate={item.dueDate}
            completed={item.completed}
            onPress={() => navigation.navigate('TaskDetailScreen', { id: item.id })}
        />
    ), [navigation]);

    const subjectStyles: { [key: string]: { backgroundColor: string } } = useMemo(() => ({
        mathematics: { backgroundColor: theme.primaryColor },
        geography: { backgroundColor: theme.secondaryColor },
        biology: { backgroundColor: theme.secondaryColor },
        physics: { backgroundColor: theme.primaryColor },
        chemistry: { backgroundColor: theme.secondaryColor },
    }), [theme]);

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <StatusBar barStyle="dark-content" backgroundColor={theme.backgroundColor} />
            <View style={styles.headerContainer}>
                <Text style={[styles.headerTitle, { color: theme.textColor }]}>{getGreeting}</Text>
                <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('SettingsScreen')}>
                    <Icon name="settings" size={24} color={theme.textColor} />
                </TouchableOpacity>
            </View>
            <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Subjects</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.subjectsContainer}>
                {["Mathematics", "Geography", "Biology", "Physics", "Chemistry"].map((subject, index) => (
                    <TouchableOpacity key={index} style={[styles.subjectBox, subjectStyles[subject.toLowerCase()]]}>
                        <Text style={styles.subjectText}>{subject}</Text>
                        <TouchableOpacity style={styles.subjectMenuButton}>
                            <Text style={styles.subjectMenuButtonText}>⋮</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.scheduleHeader}>
                <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Your Schedule</Text>
                <TouchableOpacity
                    style={[styles.viewTasksButton, { backgroundColor: theme.primaryColor }]}
                    onPress={() => navigation.navigate('TaskListScreen')}
                >
                    <Text style={[styles.viewTasksButtonText, { color: theme.buttonTextColor }]}>View Tasks</Text>
                </TouchableOpacity>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color={theme.primaryColor} style={styles.loadingIndicator} />
            ) : (
                <FlatList
                    data={tasks}
                    renderItem={renderTaskItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                />
            )}
            <TouchableOpacity
                style={[styles.fab, { backgroundColor: theme.primaryColor }]}
                onPress={() => navigation.navigate('AddTaskScreen', { id: undefined })}
            >
                <Text style={styles.fabIcon}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

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
    menuButton: {
        borderRadius: 12,
        padding: 10,
        elevation: 5,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subjectsContainer: {
        marginBottom: 20,
    },
    subjectBox: {
        borderRadius: 12,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        width: 150,
        height: 80,
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    subjectText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    subjectMenuButton: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
    subjectMenuButtonText: {
        fontSize: 18,
        color: '#FFFFFF',
    },
    scheduleHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    viewTasksButton: {
        borderRadius: 12,
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    viewTasksButtonText: {
        fontWeight: 'bold',
    },
    listContent: {
        paddingBottom: 20,
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    fabIcon: {
        fontSize: 30,
        color: '#FFFFFF',
    },
    loadingIndicator: {
        marginTop: 20,
    },
});

export default HomeScreen;
