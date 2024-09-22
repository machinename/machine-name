'use client'
import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';

interface ThemeContextType {
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (isDarkMode) {
            document.body.className = 'dark';
        } else {
            document.body.className = '';
        }
    }, [isDarkMode]);

    const contextValue = useMemo(() => ({ isDarkMode, setIsDarkMode }), [isDarkMode, setIsDarkMode]);

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useThemeContext must be used within ThemeProvider');
    }
    return context;
};