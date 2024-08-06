import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface CustomReminderTimePickerProps {
    reminderTime: string;
    onConfirm: (time: string) => void;
    placeholder?: string;
}

const CustomReminderTimePicker: React.FC<CustomReminderTimePickerProps> = ({ reminderTime, onConfirm, placeholder = 'Select Reminder Time' }) => {
    const { theme } = useTheme();
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const handleConfirm = (time: Date) => {
        let hours = time.getHours();
        const minutes = String(time.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const strTime = `${hours}:${minutes} ${ampm}`;
        onConfirm(strTime);
        setTimePickerVisibility(false);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.inputBackgroundColor }]}>
            <TouchableOpacity onPress={() => setTimePickerVisibility(true)} style={styles.pickerButton}>
                <Text style={[styles.pickerButtonText, { color: theme.textColor }]}>
                    {reminderTime || placeholder}
                </Text>
                <Icon name="arrow-drop-down" size={24} color={theme.textColor} />
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={() => setTimePickerVisibility(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#B7B7A4',
        borderRadius: 8,
    },
    pickerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    pickerButtonText: {
        fontSize: 16,
    },
});

export default CustomReminderTimePicker;
