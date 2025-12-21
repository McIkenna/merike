import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { LightModeOutlined, DarkModeOutlined } from '@mui/icons-material';
import { useThemeToggle } from './ThemeToggleProvider';

const ThemeToggleButton = ({ sx }) => {
  const { mode, toggleTheme } = useThemeToggle();

  return (
    <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
      <IconButton onClick={toggleTheme} color="inherit" sx={sx}>
        {mode === 'light' ? <LightModeOutlined /> : <DarkModeOutlined />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggleButton;