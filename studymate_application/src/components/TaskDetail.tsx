import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { TaskDetailRouteProp, TaskDetailNavigationProp } from '../types';

const TaskDetail: React.FC = () => {
  const route = useRoute<TaskDetailRouteProp>();
  const navigation = useNavigation<TaskDetailNavigationProp>();
  const { id } = route.params;

  // Load task details using id
  const task = {
    title: 'Sample Task Title',
    description: 'Sample Task Description',
    dueDate: '2023-12-31',
    reminderTime: '08:00',
  };

  return (
    <View>
      <Text>{task.title}</Text>
      <Text>{task.description}</Text>
      <Text>Due Date: {task.dueDate}</Text>
      <Text>Reminder Time: {task.reminderTime}</Text>
      <Button title="Mark as Complete" onPress={() => {}} />
      <Button title="Edit Task" onPress={() => navigation.navigate('AddTask', { id })} />
      <Button title="Delete Task" onPress={() => {}} />
    </View>
  );
}

export default TaskDetail;
