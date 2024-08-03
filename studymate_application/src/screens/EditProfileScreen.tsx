// src/screens/EditProfileScreen.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EditProfileScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Icon name="person" size={100} color="#3A86FF" />
            <Text style={styles.text}>Edit Profile Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
    },
    text: {
        fontSize: 20,
        marginTop: 20,
    },
});

export default EditProfileScreen;
