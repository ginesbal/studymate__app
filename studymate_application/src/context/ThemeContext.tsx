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
    errorColor: string;
}

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    isDarkMode: boolean;
}

const lightTheme: Theme = {
    backgroundColor: '#ffffff', // white
    textColor: '#212523', // [#212523]
    buttonBackground: '#ff7648', // [#ff7648]
    buttonTextColor: '#ffffff', // white
    primaryColor: '#182a88',  // [#182a88]
    secondaryColor: '#212523', // [#212523]
    separatorColor: '#212523', // [#212523]
    inputBackgroundColor: '#bcc1cd', // [#bcc1cd]
    placeholderTextColor: '#ffc278', // [#ffc278]
    errorColor: '#DC3545',  // Same as before
};

const darkTheme: Theme = {
    backgroundColor: '#212523', // [#212523]
    textColor: '#ffffff', // white
    buttonBackground: '#ff7648', // [#ff7648]
    buttonTextColor: '#ffffff', // white
    primaryColor: '#182a88',  // [#182a88]
    secondaryColor: '#8f98ff', // [#8f98ff]
    separatorColor: '#bcc1cd', // [#bcc1cd]
    inputBackgroundColor: '#333', // Keeping dark background for inputs
    placeholderTextColor: '#666', // Keeping gray for placeholders
    errorColor: '#FF6347',  // Same as before
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
