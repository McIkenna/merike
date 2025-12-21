import React, { createContext, useContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create context
const ThemeToggleContext = createContext();

// Custom hook to use the theme context
export const UseThemeToggle = () => {
  const context = useContext(ThemeToggleContext);
  if (!context) {
    throw new Error('useThemeToggle must be used within ThemeToggleProvider');
  }
  return context;
};