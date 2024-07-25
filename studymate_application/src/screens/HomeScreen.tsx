import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import Button from '../components/ui/Button';
import { HomeScreenNavigationProp } from '../types';

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={require('../assets/icon.png')} style={styles.icon} />
            <Text style={styles.title}>Welcome to StudyMate</Text>
            <Text style={styles.subtitle}>Your personal study planner</Text>

            <View style={styles.buttonContainer}>
                <Button title="View Tasks" onPress={() => navigation.navigate('TaskListScreen')} />
                <Button title="Add New Task" onPress={() => navigation.navigate({ name: 'AddTaskScreen', params: {} })} />
            </View>

            <View style={styles.featureContainer}>
                <Text style={styles.featureTitle}>Features</Text>
                <Text style={styles.featureText}>✓ Organize your tasks</Text>
                <Text style={styles.featureText}>✓ Set reminders</Text>
                <Text style={styles.featureText}>✓ Track your progress</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0EFEB',
        padding: 20,
    },
    icon: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#283618',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#283618',
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
    },
    featureContainer: {
        width: '100%',
        padding: 20,
        backgroundColor: '#D4D4D4',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    featureTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#283618',
        marginBottom: 10,
    },
    featureText: {
        fontSize: 16,
        color: '#283618',
        marginBottom: 5,
    },
});

export default HomeScreen;
