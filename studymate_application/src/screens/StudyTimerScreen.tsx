import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import CustomTimePickerModal from '../components/pickers/CustomTimePickerModal';

const StudyTimerScreen: React.FC = () => {
  const { theme } = useTheme();
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [customDuration, setCustomDuration] = useState(0);
  const [timerSet, setTimerSet] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedHours, setSelectedHours] = useState(0);
  const [selectedMinutes, setSelectedMinutes] = useState(0);
  const [selectedSeconds, setSelectedSeconds] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;

    if (isRunning && seconds > 0) {
      timer = setInterval(() => {
        setSeconds(prev => prev - 1);
      }, 1000);
    } else if (seconds <= 0 && isRunning) {
      stopTimer();
      Alert.alert("Time's up!", 'Your timer has finished.');
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, seconds]);

  const startTimer = () => {
    if (customDuration > 0) {
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
    setCustomDuration(0);
    setTimerSet(false);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleConfirm = (hours: number, minutes: number, seconds: number) => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    setCustomDuration(totalSeconds);
    setSeconds(totalSeconds);
    setSelectedHours(hours);
    setSelectedMinutes(minutes);
    setSelectedSeconds(seconds);
    setTimerSet(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {!timerSet ? (
        <>
          <Text style={[styles.title, { color: theme.textColor }]}>Set Study Timer</Text>
          <TouchableOpacity
            onPress={() => setTimePickerVisibility(true)}
            style={[styles.setButton, { backgroundColor: theme.primaryColor }]}
          >
            <Text style={[styles.setButtonText, { color: theme.buttonTextColor }]}>
              Set Timer
            </Text>
          </TouchableOpacity>
          <CustomTimePickerModal
            visible={isTimePickerVisible}
            onClose={() => setTimePickerVisibility(false)}
            onConfirm={handleConfirm}
            initialHours={selectedHours}
            initialMinutes={selectedMinutes}
            initialSeconds={selectedSeconds}
          />
        </>
      ) : (
        <>
          <AnimatedCircularProgress
            size={300}
            width={20}
            fill={customDuration > 0 ? ((customDuration - seconds) / customDuration) * 100 : 0}
            tintColor={theme.primaryColor}
            backgroundColor={theme.buttonBackground}
            rotation={0}
            style={styles.circularProgress}
          >
            {() => (
              <Text style={[styles.timerText, { color: theme.textColor }]}>
                {formatTime(seconds)}
              </Text>
            )}
          </AnimatedCircularProgress>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.controlButton, { backgroundColor: isRunning ? theme.secondaryColor : theme.primaryColor }]}
              onPress={isRunning ? stopTimer : startTimer}
              accessibilityLabel={isRunning ? 'Stop timer' : 'Start timer'}
            >
              <Text style={[styles.controlButtonText, { color: theme.buttonTextColor }]}>
                {isRunning ? 'Stop' : 'Start'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.controlButton, { backgroundColor: theme.secondaryColor }]}
              onPress={resetTimer}
              accessibilityLabel="Reset timer"
            >
              <Text style={[styles.controlButtonText, { color: theme.buttonTextColor }]}>Reset</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  setButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  setButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  controlButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  controlButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  circularProgress: {
    marginBottom: 20,
  },
});

export default StudyTimerScreen;
