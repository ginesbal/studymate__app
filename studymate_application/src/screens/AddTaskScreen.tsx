import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useContext, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {TasksContext} from '../context/TasksContext';
import {RootStackParamList, Task} from '../types';
import {useTheme} from '../context/ThemeContext';

type AddTaskScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddTaskScreen'
>;

const subjects = [
  {name: 'Mathematics', color: '#FFA726'}, // Orange
  {name: 'Geography', color: '#66BB6A'}, // Green
  {name: 'Biology', color: '#42A5F5'}, // Blue
  {name: 'Physics', color: '#AB47BC'}, // Purple
  {name: 'Chemistry', color: '#FF7043'}, // Coral
  {name: 'History', color: '#26C6DA'}, // Cyan
  {name: 'English', color: '#FFCA28'}, // Yellow
  {name: 'Physiology', color: '#EC407A'}, // Pink
  {name: 'Art', color: '#8D6E63'}, // Brown
  {name: 'Music', color: '#78909C'}, // Gray
  {name: 'Economics', color: '#26A69A'}, // Teal
];

const AddTaskScreen: React.FC = () => {
  const {theme} = useTheme();
  const navigation = useNavigation<AddTaskScreenNavigationProp>();
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error(
      'TasksContext is undefined, make sure you are using the TasksProvider',
    );
  }

  const {addNewTask} = context;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const handleConfirmDate = (date: Date) => {
    setDueDate(date.toISOString().split('T')[0]);
    setDatePickerVisibility(false);
  };

  const handleConfirmTime = (time: Date) => {
    setReminderTime(time.toISOString().split('T')[1].substring(0, 5));
    setTimePickerVisibility(false);
  };

  const addTask = async () => {
    if (!title || !dueDate || !selectedSubject) {
      Alert.alert(
        'Validation Error',
        'Title, Due Date, and Subject are required.',
      );
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
    <ScrollView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Text style={[styles.label, {color: theme.textColor}]}>Task Title</Text>
      <TextInput
        style={[
          styles.input,
          {backgroundColor: theme.inputBackgroundColor, color: theme.textColor},
        ]}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter task title"
        placeholderTextColor={theme.placeholderTextColor}
      />
      <Text style={[styles.label, {color: theme.textColor}]}>
        Task Description
      </Text>
      <TextInput
        style={[
          styles.input,
          {backgroundColor: theme.inputBackgroundColor, color: theme.textColor},
        ]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter task description"
        placeholderTextColor={theme.placeholderTextColor}
      />
      <Text style={[styles.label, {color: theme.textColor}]}>Due Date</Text>
      <TouchableOpacity
        onPress={() => setDatePickerVisibility(true)}
        style={[
          styles.datePickerButton,
          {backgroundColor: theme.inputBackgroundColor},
        ]}>
        <Text style={[styles.datePickerButtonText, {color: theme.textColor}]}>
          {dueDate || 'Select Due Date'}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={() => setDatePickerVisibility(false)}
        // Custom styling for DateTimePickerModal might require library-specific overrides or theme adjustments
      />
      <Text style={[styles.label, {color: theme.textColor}]}>
        Reminder Time
      </Text>
      <TouchableOpacity
        onPress={() => setTimePickerVisibility(true)}
        style={[
          styles.datePickerButton,
          {backgroundColor: theme.inputBackgroundColor},
        ]}>
        <Text style={[styles.datePickerButtonText, {color: theme.textColor}]}>
          {reminderTime || 'Select Reminder Time'}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={() => setTimePickerVisibility(false)}
        // Custom styling for DateTimePickerModal might require library-specific overrides or theme adjustments
      />
      <Text style={[styles.label, {color: theme.textColor}]}>Subject</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.subjectsContainer}>
        {subjects.map((subject, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.subjectBox,
              selectedSubject === subject.name ? styles.selectedSubjectBox : {},
              {
                backgroundColor:
                  selectedSubject === subject.name
                    ? theme.secondaryColor
                    : subject.color,
              },
            ]}
            onPress={() => setSelectedSubject(subject.name)}>
            <Text style={[styles.subjectText, {color: theme.buttonTextColor}]}>
              {subject.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: theme.primaryColor}]}
        onPress={addTask}>
        <Text style={[styles.buttonText, {color: theme.buttonTextColor}]}>
          Add Task
        </Text>
      </TouchableOpacity>
    </ScrollView>
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
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#B7B7A4',
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
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subjectsContainer: {
    marginBottom: 20,
  },
  subjectBox: {
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  selectedSubjectBox: {
    borderWidth: 2,
    borderColor: '#000',
  },
  subjectText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AddTaskScreen;
