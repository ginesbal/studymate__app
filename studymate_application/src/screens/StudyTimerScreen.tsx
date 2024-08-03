// src/screens/StudyTimerScreen.tsx

import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-native-paper';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const StudyTimerScreen: React.FC = () => {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [inputMinutes, setInputMinutes] = useState(0);
    const [inputSeconds, setInputSeconds] = useState(0);
    const [customDuration, setCustomDuration] = useState(0);

    useEffect(() => {
        let timer: ReturnType<typeof setInterval> | null = null;

        if (isRunning && seconds > 0) {
            timer = setInterval(() => {
                setSeconds(prev => prev - 1);
            }, 1000);
        } else if (seconds <= 0 && isRunning) {
            stopTimer();
            Alert.alert('Time\'s up!', 'Your timer has finished.');
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
        setInputMinutes(0);
        setInputSeconds(0);
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const progress = customDuration > 0 ? (customDuration - seconds) / customDuration : 0;

    const handleSetTimer = () => {
        const totalSeconds = inputMinutes * 60 + inputSeconds;
        if (totalSeconds > 0) {
            setCustomDuration(totalSeconds);
            setSeconds(totalSeconds);
            setIsRunning(true);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Picker
                    selectedValue={inputMinutes}
                    style={styles.picker}
                    onValueChange={itemValue => setInputMinutes(itemValue)}
                    itemStyle={styles.pickerItem}
                >
                    {Array.from({ length: 60 }, (_, i) => (
                        <Picker.Item key={i} label={`${i}`} value={i} />
                    ))}
                </Picker>
                <Text style={styles.separator}>:</Text>
                <Picker
                    selectedValue={inputSeconds}
                    style={styles.picker}
                    onValueChange={itemValue => setInputSeconds(itemValue)}
                    itemStyle={styles.pickerItem}
                >
                    {Array.from({ length: 60 }, (_, i) => (
                        <Picker.Item key={i} label={`${i}`} value={i} />
                    ))}
                </Picker>
            </View>
            <TouchableOpacity style={styles.setButton} onPress={handleSetTimer}>
                <Text style={styles.setButtonText}>Set Timer</Text>
            </TouchableOpacity>
            <Text style={styles.timerText}>{formatTime(seconds)}</Text>
            <ProgressBar
                style={styles.progressBar}
                progress={progress}
                color="#ff7648"
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.controlButton, styles.stopButton]} onPress={stopTimer}>
                    <Text style={styles.controlButtonText}>Stop</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.controlButton, styles.resetButton]} onPress={resetTimer}>
                    <Text style={styles.controlButtonText}>Reset</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        padding: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    picker: {
        height: 50,
        width: 100,
        backgroundColor: '#bcc1cd',
        color: '#212523',
    },
    pickerItem: {
        color: '#212523',
    },
    separator: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#212523',
        marginHorizontal: 10,
    },
    setButton: {
        backgroundColor: '#8f98ff',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginVertical: 10,
    },
    setButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    timerText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#182a88',
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
    controlButton: {
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginHorizontal: 10,
    },
    stopButton: {
        backgroundColor: '#ff7648',
    },
    resetButton: {
        backgroundColor: '#ffc278',
    },
    controlButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default StudyTimerScreen;
