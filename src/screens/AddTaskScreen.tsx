import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Input from '../components/ui/Input';
import {AddTaskNavigationProp, RootStackParamList} from '../types';

type AddTaskRouteProp = RouteProp<RootStackParamList, 'AddTaskScreen'>;

const AddTaskScreen: React.FC = () => {
  const navigation = useNavigation<AddTaskNavigationProp>();
  const route = useRoute<AddTaskRouteProp>();
  const {id} = route.params || {};

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [reminderTime, setReminderTime] = useState<Date | undefined>(undefined);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  const onChangeTime = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setReminderTime(selectedTime);
    }
  };

  const handleSubmit = () => {
    if (!title || !dueDate) {
      Alert.alert('Validation Error', 'Title and Due Date are required.');
      return;
    }

    const newTask = {
      id: id || Date.now().toString(),
      title,
      description,
      dueDate: dueDate.toISOString().slice(0, 10), // Format dueDate as YYYY-MM-DD
      reminderTime: reminderTime
        ? reminderTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
        : '', // Format reminderTime as HH:MM
    };

    // Save the task (logic to be implemented)
    // e.g., saveTask(newTask);

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.content}>
        <Text style={styles.header}>Add New Task</Text>

        <Input placeholder="Task Title" value={title} onChangeText={setTitle} />
        <Input
          placeholder="Task Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <View style={styles.dateTimeContainer}>
          <Input
            placeholder="Due Date (YYYY-MM-DD)"
            value={dueDate ? dueDate.toISOString().slice(0, 10) : ''}
            editable={false}
            onChangeText={() => {}}
          />
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.datePickerText}>Pick Date</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dueDate || new Date()} // Provide default value if dueDate is undefined
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
        </View>

        <View style={styles.dateTimeContainer}>
          <Input
            placeholder="Reminder Time (HH:MM)"
            value={
              reminderTime
                ? reminderTime.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : ''
            }
            editable={false}
            onChangeText={() => {}}
          />
          <TouchableOpacity onPress={() => setShowTimePicker(true)}>
            <Text style={styles.datePickerText}>Pick Time</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={reminderTime || new Date()} // Provide default value if reminderTime is undefined
              mode="time"
              display="default"
              onChange={onChangeTime}
            />
          )}
        </View>

        <Button title="Save Task" onPress={handleSubmit} color="#283618" />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0EFEB',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#283618',
    textAlign: 'center',
  },
  dateTimeContainer: {
    marginBottom: 20,
  },
  datePickerText: {
    color: '#283618',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default AddTaskScreen;
