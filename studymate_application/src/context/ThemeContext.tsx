// src/context/ThemeContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Theme {
    backgroundColor: string;
    textColor: string;
    buttonBackground: string;
    buttonTextColor: string;
    primaryColor: string;
    secondaryColor: string;
    separatorColor: string;
    inputBackgroundColor: string;
    placeholderTextColor: string;
    errorColor: string;  // Add this line
}

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    isDarkMode: boolean;
}

const lightTheme: Theme = {
    backgroundColor: '#F8F8F8',
    textColor: '#1E1E2E',
    buttonBackground: '#3A86FF',
    buttonTextColor: '#FFFFFF',
    primaryColor: '#3A86FF',
    secondaryColor: '#FF7648',
    separatorColor: '#212523',
    inputBackgroundColor: '#FFFFFF',
    placeholderTextColor: '#A9A9A9',
    errorColor: '#DC3545',  // Add this line
};

const darkTheme: Theme = {
    backgroundColor: '#1E1E2E',
    textColor: '#F8F8F8',
    buttonBackground: '#FF7648',
    buttonTextColor: '#1E1E2E',
    primaryColor: '#3A86FF',
    secondaryColor: '#FF7648',
    separatorColor: '#A9A9A9',
    inputBackgroundColor: '#333',
    placeholderTextColor: '#666',
    errorColor: '#FF6347',  // Add this line
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const theme = isDarkMode ? darkTheme : lightTheme;

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
