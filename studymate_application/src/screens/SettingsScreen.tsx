import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../context/ThemeContext';

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const {theme, toggleTheme} = useTheme();

  const handleSignOut = () => {
    // Implement sign-out logic here
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={theme.textColor} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: theme.textColor}]}>
          Settings
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: theme.primaryColor}]}
        onPress={toggleTheme}>
        <Text style={[styles.buttonText, {color: theme.buttonTextColor}]}>
          Dark Mode
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: theme.primaryColor}]}
        onPress={handleSignOut}>
        <Text style={[styles.buttonText, {color: theme.buttonTextColor}]}>
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
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
