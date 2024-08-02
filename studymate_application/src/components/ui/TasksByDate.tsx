import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import TaskItem from './TaskItem';
import {Task} from '../../types';

type TasksByDateProps = {
  date: string;
  tasks: Task[];
  onPressTask: (id: string) => void;
};

const TasksByDate: React.FC<TasksByDateProps> = ({
  date,
  tasks,
  onPressTask,
}) => {
  const renderTaskItem = ({item}: {item: Task}) => (
    <TaskItem title={item.title} onPress={() => onPressTask(item.id)} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{date}</Text>
      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#283618',
    marginBottom: 10,
  },
});

export default TasksByDate;
