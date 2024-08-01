import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type TaskItemProps = {
  title: string;
  onPress: () => void;
};

const TaskItem: React.FC<TaskItemProps> = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.taskItem} onPress={onPress}>
      <View style={styles.taskContent}>
        <Text style={styles.taskText}>{title}</Text>
        <Icon name="chevron-right" size={24} color="#ccc" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskText: {
    fontSize: 18,
    color: '#283618',
    flex: 1,
    marginRight: 8,
  },
});

export default TaskItem;
