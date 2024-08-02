// src/screens/TaskListScreen.tsx

import React, {useContext} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {TaskContext} from '../context/TaskContext';

const TaskListScreen: React.FC = () => {
  const {tasks} = useContext(TaskContext)!;

  const renderItem = ({item}: {item: any}) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.taskDetails}>Due: {item.dueDate}</Text>
      <Text style={styles.taskDetails}>Reminder: {item.reminderTime}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tasks</Text>
      {tasks.length === 0 ? (
        <Text style={styles.noTasksMessage}>No tasks to do.</Text>
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0EFEB',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#283618',
    textAlign: 'center',
  },
  taskItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#283618',
  },
  taskDetails: {
    fontSize: 16,
    color: '#4A4A4A',
  },
  noTasksMessage: {
    fontSize: 18,
    color: '#4A4A4A',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TaskListScreen;
