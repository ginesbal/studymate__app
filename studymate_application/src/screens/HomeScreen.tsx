import React, { useCallback, useMemo } from 'react';
import {
    ActivityIndicator, FlatList,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TaskItem from '../components/ui/TaskItem';
import { groupTasksByDate } from '../utils/groupTasksByDate';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/ui/Header';
import SubjectList from '../components/ui/SubjectList';
import ScheduleHeader from '../components/ui/ScheduleHeader';
import { useTasks } from '../context/TasksContext';
import { RootStackParamList, Task } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC = () => {
    const { theme } = useTheme();
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const { tasks, loading, error } = useTasks();

    const groupedTasks = useMemo(() => groupTasksByDate(tasks), [tasks]);

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
            <Header greeting={getGreeting} onSettingsPress={() => navigation.navigate('SettingsScreen')} />
            <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Subjects</Text>
            <SubjectList subjectStyles={subjectStyles} />
            <ScheduleHeader onViewTasksPress={() => navigation.navigate('TaskListScreen')} />
            {loading ? (
                <ActivityIndicator size="large" color={theme.primaryColor} style={styles.loadingIndicator} />
            ) : error ? (
                <Text style={[styles.errorText, { color: theme.errorColor }]}>{error}</Text>
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
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
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
    errorText: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 20,
    },
});

export default HomeScreen;
