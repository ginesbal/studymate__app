import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

type InputProps = {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    multiline?: boolean;
    editable?: boolean;
};

const Input: React.FC<InputProps> = ({ placeholder, value, onChangeText, multiline = false, editable = true }) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            multiline={multiline}
            editable={editable}
            placeholderTextColor="#B7B7A4"
        />
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#B7B7A4',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        color: '#283618',
    },
});

export default Input;
