import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { AddTaskNavigationProp, RootStackParamList } from '../types';

type AddTaskRouteProp = RouteProp<RootStackParamList, 'AddTask'>;

const AddTask: React.FC = () => {
    const navigation = useNavigation<AddTaskNavigationProp>();
    const route = useRoute<AddTaskRouteProp>();
    const { id } = route.params || {};

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [reminderTime, setReminderTime] = useState('');

    const handleSubmit = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add New Task</Text>
            <TextInput
                style={styles.input}
                placeholder="Task Title"
                value={title}
                onChangeText={(text) => setTitle(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Task Description"
                value={description}
                onChangeText={(text) => setDescription(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Due Date"
                value={dueDate}
                onChangeText={(text) => setDueDate(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Reminder Time"
                value={reminderTime}
                onChangeText={(text) => setReminderTime(text)}
            />
            <View style={styles.buttonContainer}>
                <Button title="Save Task" onPress={handleSubmit} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
        color: '#5F33E1',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },

    button: {
        backgroundColor: '#5F33E1',
        alignItems: 'center',
        cursor: 'pointer',
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'space-around',
        height: 120
    },
});

export default AddTask;

