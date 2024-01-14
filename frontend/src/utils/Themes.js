import { createTheme } from '@mui/material/styles';

// Define color shades
const primaryBlue = {
  light: '#D4F1F4',
  main: '#044CAB',
  dark: '#05445E',
  contrastText: '#fff',
};

const primaryRed = {
  light: '#E7625F',
  main: '#FB3D3D',
  dark: '#C85250',
  contrastText: '#fff',
};

const primaryGreen = {
  light: '#75E6DA',
  main: '#D1E2C4',
  dark: '#116530',
  contrastText: '#fff',
};

const primaryLight ={
  light: '#B5E5CF',
  main: '#fff',
  dark: '#FCB5AC',
  contrastText: '#212121',
}

const neutralBlack = '#212121';
const neutralGray = '#757575';
const neutralWhite = '#D1E2C4';
const lightGray = '#EBEBE8';
const textcolor = '#EBEBE8';
// Create dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: primaryBlue,
    secondary: primaryRed,
    success: primaryGreen,
    text: {
      primary: '#fff',
    },
    background: {
      default: neutralGray,
      paper: neutralBlack,
    },
  },
});

// Create light theme
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: primaryLight,
    secondary: primaryRed,
    success: primaryGreen,
    text: {
      primary: neutralBlack,
    },
    background: {
      default: neutralBlack,
      paper: lightGray,
    },
  },

});

export { darkTheme, lightTheme };