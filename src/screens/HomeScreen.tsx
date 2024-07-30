import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  SectionList,
  StatusBar,
} from 'react-native';
import {Task} from '../types'; // Import types
import tasksData from '../data/tasks.json'; // Assuming tasksData has a correct type
import {groupTasksByDate} from '../utils/groupTasksByDate';

const HomeScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Fetch tasks (simulated here with a timeout)
    setTimeout(() => {
      setTasks(tasksData as Task[]); // Type assertion to ensure tasksData is treated as Task[]
    }, 1000);
  }, []);

  const groupedTasks = groupTasksByDate(tasks);
  const sections = Object.keys(groupedTasks).map(date => ({
    title: date,
    data: groupedTasks[date],
  }));

  const renderTaskItem = ({item}: {item: Task}) => (
    <View style={styles.taskContainer}>
      <View style={styles.taskContent}>
        <View style={styles.dateCircle}>
          <Text style={styles.dateText}>
            {new Date(item.dueDate).getDate()}
          </Text>
        </View>
        <Text style={styles.taskTitle} numberOfLines={1} ellipsizeMode="tail">
          {item.title}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0EFEB" />
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/images/icon.png')}
          style={styles.icon}
        />
        <Text style={styles.title}>Welcome to StudyMate</Text>
      </View>
      <Text style={styles.subtitle}>Your personal study planner</Text>

      <Text style={styles.quoteText}>
        "The secret to getting ahead is getting started." - Mark Twain
      </Text>

      <View style={styles.smallSectionContainer}>
        <Text style={styles.smallSectionTitle}>Statistics</Text>
        <View style={styles.statisticsContainer}>
          <Text style={styles.statisticsText}>
            Completed: {tasks.filter(task => task.completed).length}
          </Text>
          <Text style={styles.statisticsText}>
            Pending: {tasks.filter(task => !task.completed).length}
          </Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Upcoming Tasks</Text>
        <SectionList
          sections={sections}
          renderItem={renderTaskItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0EFEB',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#283618',
  },
  subtitle: {
    fontSize: 18,
    color: '#283618',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionContainer: {
    flex: 1,
    backgroundColor: '#D4D4D4',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  smallSectionContainer: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#283618',
    marginBottom: 10,
  },
  smallSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#283618',
    marginBottom: 10,
  },
  dateCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#B7B7A4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  dateText: {
    color: '#283618',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statisticsText: {
    fontSize: 16,
    color: '#283618',
    marginBottom: 5,
  },
  statisticsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quoteText: {
    fontSize: 16,
    color: '#283618',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  taskContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 16,
    color: '#283618',
    flex: 1,
  },
});

export default HomeScreen;
