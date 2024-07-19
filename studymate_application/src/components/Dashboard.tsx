import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DashboardNavigationProp } from '../types';

const Dashboard: React.FC = () => {
    const navigation = useNavigation<DashboardNavigationProp>();

    return (
        <View style={styles.container}>
            <Image source={require('../assets/icon.png')} style={styles.icon} />
            <Text style={styles.title}>Welcome to studyMate</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('TaskList')}
                >
                    <Text style={styles.buttonText}>View Tasks</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate({ name: 'AddTask', params: {} })}
                >
                    <Text style={styles.buttonText}>Add New Task</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    icon: {
        width: 300,
        height: 300,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'space-around',
        height: 120,
    },
    button: {
        backgroundColor: '#5F33E1',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        cursor: 'pointer',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Dashboard;

