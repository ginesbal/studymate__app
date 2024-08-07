import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import TaskItem from '../components/ui/TaskItem';
import {RootStackParamList, Task} from '../types';
import {groupTasksByDate} from '../utils/groupTasksByDate';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTheme} from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HomeScreen'
>;

const HomeScreen: React.FC = () => {
  const {theme} = useTheme();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('tasks');
        if (savedTasks) {
          setTasks(JSON.parse(savedTasks));
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const addNewTask = useCallback((newTask: Task) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  }, []);

  const groupedTasks = useMemo(() => groupTasksByDate(tasks), [tasks]);

  const sections = useMemo(
    () =>
      Object.keys(groupedTasks).map(date => ({
        title: date,
        data: groupedTasks[date],
      })),
    [groupedTasks],
  );

  const getGreeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning! 🌅';
    if (hour < 18) return 'Good afternoon! ☀️';
    return 'Good evening! 🌆';
  }, []);

  const renderTaskItem = useCallback(
    ({item}: {item: Task}) => (
      <TaskItem
        title={item.title}
        dueDate={item.dueDate}
        completed={item.completed}
        onPress={() => navigation.navigate('TaskDetailScreen', {id: item.id})}
      />
    ),
    [navigation],
  );

  // New color palette for subjects
  const colorPalette = [
    '#FFA726', // Orange
    '#66BB6A', // Green
    '#42A5F5', // Blue
    '#AB47BC', // Purple
    '#FF7043', // Coral
    '#26C6DA', // Cyan
    '#FFCA28', // Yellow
    '#EC407A', // Pink
    '#8D6E63', // Brown
    '#78909C', // Gray
    '#26A69A', // Teal
    '#7E57C2', // Indigo
  ];

  const subjectStyles: {[key: string]: {backgroundColor: string}} = useMemo(
    () => ({
      mathematics: {backgroundColor: colorPalette[0]},
      geography: {backgroundColor: colorPalette[1]},
      biology: {backgroundColor: colorPalette[2]},
      physics: {backgroundColor: colorPalette[3]},
      chemistry: {backgroundColor: colorPalette[4]},
      history: {backgroundColor: colorPalette[5]},
      english: {backgroundColor: colorPalette[6]},
      art: {backgroundColor: colorPalette[7]},
      music: {backgroundColor: colorPalette[8]},
      economics: {backgroundColor: colorPalette[9]},
      socialStudies: {backgroundColor: colorPalette[10]},
      physiology: {backgroundColor: colorPalette[11]},
    }),
    [colorPalette],
  );

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.backgroundColor}
      />
      <View style={styles.headerContainer}>
        <Text style={[styles.headerTitle, {color: theme.textColor}]}>
          {getGreeting}
        </Text>
        <TouchableOpacity
          style={[styles.menuButton, {backgroundColor: theme.backgroundColor}]}
          onPress={() => navigation.navigate('SettingsScreen')}>
          <Icon name="settings" size={24} color={theme.textColor} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.sectionTitle, {color: theme.textColor}]}>
        Subjects
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.subjectsContainer}>
        {[
          'Mathematics',
          'Geography',
          'Biology',
          'Physics',
          'Chemistry',
          'History',
          'English',
          'Physiology',
          'Art',
          'Music',
          'Economics',
        ].map((subject, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.subjectBox,
              subjectStyles[subject.toLowerCase().replace(' ', '')],
            ]}>
            <Text style={[styles.subjectText, {color: theme.buttonTextColor}]}>
              {subject}
            </Text>
            <TouchableOpacity style={styles.subjectMenuButton}>
              <Text
                style={[
                  styles.subjectMenuButtonText,
                  {color: theme.buttonTextColor},
                ]}>
                ⋮
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.scheduleHeader}>
        <Text style={[styles.sectionTitle, {color: theme.textColor}]}>
          Your Schedule
        </Text>
        <TouchableOpacity
          style={[
            styles.viewTasksButton,
            {backgroundColor: theme.primaryColor},
          ]}
          onPress={() => navigation.navigate('TaskListScreen')}>
          <Text
            style={[
              styles.viewTasksButtonText,
              {color: theme.buttonTextColor},
            ]}>
            View Tasks
          </Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={theme.primaryColor}
          style={styles.loadingIndicator}
        />
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderTaskItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
      <TouchableOpacity
        style={[styles.fab, {backgroundColor: theme.primaryColor}]}
        onPress={() => navigation.navigate('AddTaskScreen', {id: undefined})}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};




const styles = StyleSheet.create({
<<<<<<< HEAD
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  menuButton: {
    borderRadius: 12,
    padding: 10,
    // Apply very light shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subjectsContainer: {
    marginBottom: 20,
  },
  subjectBox: {
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    width: 150,
    height: 80,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  subjectText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subjectMenuButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  subjectMenuButtonText: {
    fontSize: 18,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  viewTasksButton: {
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  viewTasksButtonText: {
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 24,
    color: '#FFF',
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default HomeScreen;
