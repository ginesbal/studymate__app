import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

const SettingsScreen: React.FC = () => {
    const navigation = useNavigation();
    const { theme, toggleTheme } = useTheme();

    const handleSignOut = () => {
        // Implement sign-out logic here
        navigation.navigate('LoginScreen');
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Text style={[styles.headerTitle, { color: theme.textColor }]}>Settings</Text>
            <TouchableOpacity style={[styles.button, { backgroundColor: theme.primaryColor }]} onPress={toggleTheme}>
                <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>Toggle Theme</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: theme.primaryColor }]} onPress={handleSignOut}>
                <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
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
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SettingsScreen;
