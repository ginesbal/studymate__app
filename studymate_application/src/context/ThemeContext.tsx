import React, { createContext, useState, useContext, ReactNode } from 'react';

const lightTheme = {
    backgroundColor: '#F8F8F8',
    textColor: '#1E1E2E',
    primaryColor: '#3A86FF',
    secondaryColor: '#FF6F61',
    buttonBackground: '#8f98ff',
    buttonTextColor: '#FFFFFF',
    separatorColor: '#212523',
};

const darkTheme = {
    backgroundColor: '#1E1E2E',
    textColor: '#F8F8F8',
    primaryColor: '#8f98ff',
    secondaryColor: '#FF6F61',
    buttonBackground: '#3A86FF',
    buttonTextColor: '#1E1E2E',
    separatorColor: '#A9A9A9',
};

type ThemeContextType = {
    theme: typeof lightTheme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState(lightTheme);

    const toggleTheme = () => {
        setTheme(theme === lightTheme ? darkTheme : lightTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
