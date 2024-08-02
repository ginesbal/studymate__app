import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TasksContext } from '../context/TasksContext';
import { RootStackParamList, Task } from '../types'; // Ensure this import is correct

type AddTaskScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddTaskScreen'>;

const AddTaskScreen: React.FC = () => {
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
        <View style={styles.container}>
            <Text style={styles.label}>Task Title</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter task title"
                placeholderTextColor="#A9A9A9"
            />
            <Text style={styles.label}>Task Description</Text>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter task description"
                placeholderTextColor="#A9A9A9"
            />
            <Text style={styles.label}>Due Date</Text>
            <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={styles.datePickerButton}>
                <Text style={styles.datePickerButtonText}>{dueDate || 'Select Due Date'}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmDate}
                onCancel={() => setDatePickerVisibility(false)}
            />
            <Text style={styles.label}>Reminder Time</Text>
            <TouchableOpacity onPress={() => setTimePickerVisibility(true)} style={styles.datePickerButton}>
                <Text style={styles.datePickerButtonText}>{reminderTime || 'Select Reminder Time'}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleConfirmTime}
                onCancel={() => setTimePickerVisibility(false)}
            />
            <TouchableOpacity style={styles.button} onPress={addTask}>
                <Text style={styles.buttonText}>Add Task</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F8F8F8',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#1E1E2E',
    },
    input: {
        borderWidth: 1,
        borderColor: '#B7B7A4',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        color: '#1E1E2E',
        backgroundColor: '#FFFFFF',
        fontSize: 16,
    },
    datePickerButton: {
        borderWidth: 1,
        borderColor: '#B7B7A4',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    datePickerButtonText: {
        color: '#1E1E2E',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#3A86FF',
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
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AddTaskScreen;
