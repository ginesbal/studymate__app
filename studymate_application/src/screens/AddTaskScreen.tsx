import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TasksContext } from '../context/TasksContext';
import { RootStackParamList, Task } from '../types';
import { useTheme } from '../context/ThemeContext';

type AddTaskScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddTaskScreen'>;

const AddTaskScreen: React.FC = () => {
    const { theme } = useTheme();
    const navigation = useNavigation<AddTaskScreenNavigationProp>();
    const context = useContext(TasksContext);

    if (!context) {
        throw new Error("TasksContext is undefined, make sure you are using the TasksProvider");
    }

    const { addNewTask } = context;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [reminderTime, setReminderTime] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const handleConfirmDate = (date: Date) => {
        setDueDate(date.toISOString().split('T')[0]);
        setDatePickerVisibility(false);
    };

    const handleConfirmTime = (time: Date) => {
        setReminderTime(time.toISOString().split('T')[1].substring(0, 5));
        setTimePickerVisibility(false);
    };

    const addTask = async () => {
        if (!title || !dueDate) {
            Alert.alert('Validation Error', 'Title and Due Date are required.');
            return;
        }

        const newTask: Task = {
            id: Date.now().toString(),
            title,
            description,
            dueDate,
            reminderTime,
            completed: false,
        };

        try {
            const storedTasks = await AsyncStorage.getItem('tasks');
            const tasks = storedTasks ? JSON.parse(storedTasks) : [];
            tasks.push(newTask);
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            addNewTask(newTask);
            navigation.goBack();
        } catch (error) {
            console.error('Error saving task:', error);
            Alert.alert('Error', 'An error occurred while saving the task.');
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Text style={[styles.label, { color: theme.textColor }]}>Task Title</Text>
            <TextInput
                style={[styles.input, { backgroundColor: theme.buttonBackground, color: theme.textColor }]}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter task title"
                placeholderTextColor={theme.textColor}
            />
            <Text style={[styles.label, { color: theme.textColor }]}>Task Description</Text>
            <TextInput
                style={[styles.input, { backgroundColor: theme.buttonBackground, color: theme.textColor }]}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter task description"
                placeholderTextColor={theme.textColor}
            />
            <Text style={[styles.label, { color: theme.textColor }]}>Due Date</Text>
            <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={[styles.datePickerButton, { backgroundColor: theme.buttonBackground }]}>
                <Text style={[styles.datePickerButtonText, { color: theme.textColor }]}>{dueDate || 'Select Due Date'}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmDate}
                onCancel={() => setDatePickerVisibility(false)}
            />
            <Text style={[styles.label, { color: theme.textColor }]}>Reminder Time</Text>
            <TouchableOpacity onPress={() => setTimePickerVisibility(true)} style={[styles.datePickerButton, { backgroundColor: theme.buttonBackground }]}>
                <Text style={[styles.datePickerButtonText, { color: theme.textColor }]}>{reminderTime || 'Select Reminder Time'}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleConfirmTime}
                onCancel={() => setTimePickerVisibility(false)}
            />
            <TouchableOpacity style={[styles.button, { backgroundColor: theme.primaryColor }]} onPress={addTask}>
                <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>Add Task</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
    datePickerButton: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    datePickerButtonText: {
        fontSize: 16,
    },
    button: {
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AddTaskScreen;
