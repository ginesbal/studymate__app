import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, SectionList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { HomeScreenNavigationProp, Task } from '../types';
import { groupTasksByDate } from '../utils/groupTasksByDate';

const HomeScreen: React.FC<{ name: string }> = ({ name }) => {
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

    const groupedTasks = groupTasksByDate(tasks);
    const sections = Object.keys(groupedTasks).map(date => ({
        title: date,
        data: groupedTasks[date],
    }));

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return `Good morning, ${name} 🌅`;
        if (hour < 18) return `Good afternoon, ${name} ☀️`;
        return `Good evening, ${name} 🌆`;
    };

    const renderTaskItem = ({ item }: { item: Task }) => (
        <View style={styles.taskContainer}>
            <View style={styles.taskContent}>
                <View style={styles.dateCircle}>
                    <Text style={styles.dateText}>{new Date(item.dueDate).getDate()}</Text>
                </View>
                <View>
                    <Text style={styles.taskTitle} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
                    <Text style={styles.taskSubtitle}>{item.description}</Text>
                </View>
            </View>
        </View>
    );

    const subjectStyles: { [key: string]: any } = {
        mathematics: styles.mathematics,
        geography: styles.geography,
        biology: styles.biology,
        physics: styles.physics,
        chemistry: styles.chemistry,
    };

    const subjectIcons: { [key: string]: string } = {
        mathematics: 'calculator',
        geography: 'globe',
        biology: 'leaf',
        physics: 'atom',
        chemistry: 'flask',
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8F8F8" />
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>{getGreeting()}</Text>
                <TouchableOpacity style={styles.menuButton}>
                    <Text style={styles.menuButtonText}>⋮</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.sectionTitle}>Subjects</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.subjectsContainer}>
                {["Mathematics", "Geography", "Biology", "Physics", "Chemistry"].map((subject, index) => (
                    <TouchableOpacity key={index} style={[styles.subjectBox, subjectStyles[subject.toLowerCase()]]}>
                        <Icon name={subjectIcons[subject.toLowerCase()]} size={30} color="#FFFFFF" style={styles.subjectIcon} />
                        <Text style={styles.subjectText}>{subject}</Text>
                        <TouchableOpacity style={styles.subjectMenuButton}>
                            <Text style={styles.subjectMenuButtonText}>⋮</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.scheduleHeader}>
                <Text style={styles.sectionTitle}>Your Schedule</Text>
                <TouchableOpacity
                    style={styles.viewTasksButton}
                    onPress={() => navigation.navigate('TaskListScreen')}
                >
                    <Text style={styles.viewTasksButtonText}>View Tasks</Text>
                </TouchableOpacity>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#3A86FF" style={styles.loadingIndicator} />
            ) : (
                <SectionList
                    sections={sections}
                    renderItem={renderTaskItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                />
            )}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate({ name: 'AddTaskScreen', params: {} })}
            >
                <Text style={styles.fabIcon}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

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
    menuButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 10,
        elevation: 5,
    },
    menuButtonText: {
        fontSize: 18,
        color: '#1E1E2E',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1E1E2E',
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
        marginTop: 5,
    },
    subjectIcon: {
        marginBottom: 5,
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
    mathematics: {
        backgroundColor: '#FF6F61',
    },
    geography: {
        backgroundColor: '#6B8E23',
    },
    biology: {
        backgroundColor: '#20B2AA',
    },
    physics: {
        backgroundColor: '#1E90FF',
    },
    chemistry: {
        backgroundColor: '#DA70D6',
    },
    scheduleHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    viewTasksButton: {
        backgroundColor: '#3A86FF',
        borderRadius: 12,
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    viewTasksButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    listContent: {
        paddingBottom: 20,
    },
    taskContainer: {
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
        color: '#1E1E2E',
    },
    taskSubtitle: {
        fontSize: 14,
        color: '#A0A0A0',
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#3A86FF',
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
