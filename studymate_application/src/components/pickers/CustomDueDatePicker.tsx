import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useTheme } from '../../context/ThemeContext';

interface CustomDueDatePickerProps {
    dueDate: string;
    onConfirm: (date: string) => void;
}

const CustomDueDatePicker: React.FC<CustomDueDatePickerProps> = ({ dueDate, onConfirm }) => {
    const { theme } = useTheme();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const handleConfirm = (date: Date) => {
        onConfirm(date.toISOString().split('T')[0]);
        setDatePickerVisibility(false);
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={[styles.datePickerButton, { backgroundColor: theme.inputBackgroundColor }]}>
                <Text style={[styles.datePickerButtonText, { color: theme.textColor }]}>{dueDate || 'Select Due Date'}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => setDatePickerVisibility(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    datePickerButton: {
        borderWidth: 1,
        borderColor: '#B7B7A4',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    datePickerButtonText: {
        fontSize: 16,
    },
});

export default CustomDueDatePicker;
