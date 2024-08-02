import React, {useState, useContext, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Input from '../components/ui/Input';
import {AddTaskNavigationProp, RootStackParamList} from '../types';
import {TasksContext} from '../context/TasksContext'; // Import TaskContext
import CustomAlertModal from '../components/ui/CustomAlertModal'; // Import CustomAlertModal

type AddTaskRouteProp = RouteProp<RootStackParamList, 'AddTaskScreen'>;

const AddTaskScreen: React.FC = () => {
  const navigation = useNavigation<AddTaskNavigationProp>();
  const route = useRoute<AddTaskRouteProp>();
  const {id} = route.params || {};

  const {addTask} = useContext(TasksContext)!; // Use TaskContext

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [reminderTime, setReminderTime] = useState<Date | undefined>(undefined);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

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
      setShowAlert(true); // Show custom alert modal
      return;
    }

    if (addTask) {
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
        completed: false, // Initialize completed as false
      };

      addTask(newTask); // Add task to context
      navigation.goBack();
    }
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
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
          />
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setShowDatePicker(true)}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}>
            <Text style={styles.datePickerText}>Pick Date</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dueDate || new Date()}
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
          />
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setShowTimePicker(true)}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}>
            <Text style={styles.datePickerText}>Pick Time</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={reminderTime || new Date()}
              mode="time"
              display="default"
              onChange={onChangeTime}
            />
          )}
        </View>

        <Animated.View style={{transform: [{scale: scaleAnim}]}}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Text style={styles.saveButtonText}>Save Task</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Use CustomAlertModal */}
      <CustomAlertModal
        visible={showAlert}
        onClose={() => setShowAlert(false)}
        message="Title and Due Date are required."
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9F7F0',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4A4A4A',
    textAlign: 'center',
  },
  dateTimeContainer: {
    marginBottom: 20,
  },
  datePickerText: {
    color: '#4A4A4A',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
  },
  pickerButton: {
    backgroundColor: '#B7B7A4',
    borderRadius: 8,
    padding: 10,
    borderColor: '#A09B9B', // Darker border
    borderWidth: 1,
  },
  saveButton: {
    backgroundColor: '#283618', // Green color for button
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#A09B9B', // Darker border for inputs
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
});

export default AddTaskScreen;
