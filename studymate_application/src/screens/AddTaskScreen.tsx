import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TasksContext } from '../context/TasksContext';
import { RootStackParamList, Task } from '../types';
import { useTheme } from '../context/ThemeContext';
import CustomDueDatePicker from '../components/pickers/CustomDueDatePicker';
import CustomReminderTimePicker from '../components/pickers/CustomReminderTimePicker';
import CustomSubjectPicker from '../components/pickers/CustomSubjectPicker';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
    const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Low');

    const addTask = async () => {
        if (!title || !dueDate || !selectedSubject) {
            Alert.alert('Validation Error', 'Title, Due Date, and Subject are required.');
            return;
        }

        const newTask: Task = {
            id: Date.now().toString(),
            title,
            description,
            dueDate,
            reminderTime,
            completed: false,
            subject: selectedSubject,
            priority,
            startTime,
            endTime,
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
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={[styles.cancelButton, { color: theme.textColor }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={addTask}>
                    <Text style={[styles.doneButton, { color: theme.primaryColor }]}>Done</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={[styles.label, { color: theme.textColor }]}>Title</Text>
                <TextInput
                    style={[styles.input, { backgroundColor: theme.inputBackgroundColor, color: theme.textColor }]}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Enter task title"
                    placeholderTextColor={theme.placeholderTextColor}
                />
                <Text style={[styles.label, { color: theme.textColor }]}>Description</Text>
                <TextInput
                    style={[styles.input, styles.descriptionInput, { backgroundColor: theme.inputBackgroundColor, color: theme.textColor }]}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Enter task description"
                    placeholderTextColor={theme.placeholderTextColor}
                    multiline
                />
                <View style={styles.rowContainer}>
                    <View style={styles.pickerContainer}>
                        <Icon name="event" size={24} color={theme.textColor} style={styles.icon} />
                        <CustomDueDatePicker dueDate={dueDate} onConfirm={setDueDate} />
                    </View>
                    <View style={styles.pickerContainer}>
                        <Icon name="alarm" size={24} color={theme.textColor} style={styles.icon} />
                        <CustomReminderTimePicker reminderTime={reminderTime} onConfirm={setReminderTime} />
                    </View>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.pickerContainer}>
                        <Icon name="access-time" size={24} color={theme.textColor} style={styles.icon} />
                        <CustomReminderTimePicker reminderTime={startTime} onConfirm={setStartTime} placeholder="Start Time" />
                    </View>
                    <View style={styles.pickerContainer}>
                        <Icon name="access-time" size={24} color={theme.textColor} style={styles.icon} />
                        <CustomReminderTimePicker reminderTime={endTime} onConfirm={setEndTime} placeholder="End Time" />
                    </View>
                </View>
                <CustomSubjectPicker selectedSubject={selectedSubject} onSelect={setSelectedSubject} />
                <View style={styles.priorityContainer}>
                    <Text style={[styles.label, { color: theme.textColor }]}>Priority</Text>
                    <View style={styles.priorityButtons}>
                        {['Low', 'Medium', 'High'].map(level => (
                            <TouchableOpacity
                                key={level}
                                style={[
                                    styles.priorityButton,
                                    {
                                        backgroundColor: priority === level ? theme.primaryColor : theme.buttonBackground,
                                    },
                                ]}
                                onPress={() => setPriority(level as 'Low' | 'Medium' | 'High')}
                            >
                                <Text style={[styles.priorityButtonText, { color: priority === level ? theme.buttonTextColor : theme.textColor }]}>
                                    {level}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    cancelButton: {
        fontSize: 16,
    },
    doneButton: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    contentContainer: {
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: '#B7B7A4',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        fontSize: 16,
    },
    descriptionInput: {
        height: 100,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    icon: {
        marginRight: 10,
    },
    priorityContainer: {
        marginBottom: 20,
    },
    priorityButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    priorityButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    priorityButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default AddTaskScreen;
