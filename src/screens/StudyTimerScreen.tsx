import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ProgressBarAndroid,
  TextInput,
} from 'react-native';

const StudyTimerScreen: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState('');
  const [inputSeconds, setInputSeconds] = useState('');
  const [customDuration, setCustomDuration] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;

    if (isRunning && seconds > 0) {
      timer = setInterval(() => {
        setSeconds(prev => prev - 1); // Decrease seconds
      }, 1000);
    } else {
      if (timer) {
        clearInterval(timer);
      }
      if (seconds <= 0) {
        stopTimer();
      }
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
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
    setInputMinutes('');
    setInputSeconds('');
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(
      2,
      '0',
    )}`;
  };

  const progress =
    customDuration > 0 ? (customDuration - seconds) / customDuration : 0;

  const handleSetTimer = () => {
    const minutes = parseInt(inputMinutes, 10) || 0;
    const secs = parseInt(inputSeconds, 10) || 0;
    const totalSeconds = minutes * 60 + secs;
    if (totalSeconds > 0) {
      setCustomDuration(totalSeconds);
      setSeconds(totalSeconds); // Set initial seconds
      setIsRunning(true); // Start the timer immediately
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Minutes"
          value={inputMinutes}
          onChangeText={setInputMinutes}
        />
        <Text style={styles.separator}>:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Seconds"
          value={inputSeconds}
          onChangeText={setInputSeconds}
        />
      </View>
      <Button title="Set Timer" onPress={handleSetTimer} color="#4CAF50" />
      <Text style={styles.timerText}>{formatTime(seconds)}</Text>
      <ProgressBarAndroid
        style={styles.progressBar}
        indeterminate={false}
        progress={progress}
        color="#B7B7A4"
      />
      <View style={styles.buttonContainer}>
        <Button title="Stop" onPress={stopTimer} color="#F44336" />
        <Button title="Reset" onPress={resetTimer} color="#FFC107" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0EFEB',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: 80,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    fontSize: 18,
    textAlign: 'center',
  },
  separator: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#283618',
    marginHorizontal: 10,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#283618',
    marginBottom: 20,
  },
  progressBar: {
    width: '80%',
    height: 10,
    marginBottom: 20,
    backgroundColor: '#D4D4D4',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default StudyTimerScreen;
