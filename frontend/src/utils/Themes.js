import { createTheme } from '@mui/material/styles';

// Define color shades as exportable constants
export const colors = {
  primaryBlue: {
    light: '#D4F1F4',
    main: '#044CAB',
    dark: '#05445E',
    contrastText: '#fff',
  },
  primaryRed: {
    light: '#ed7d7bff',
    main: '#FB3D3D',
    dark: '#C85250',
    contrastText: '#f1d1d1ff',
  },
  primaryGreen: {
    light: '#75E6DA',
    main: '#D1E2C4',
    dark: '#116530',
    contrastText: '#fff',
  },
  primaryLight: {
    light: '#B5E5CF',
    main: '#fff',
    dark: '#FCB5AC',
    contrastText: '#212121',
  },
  neutral: {
    black: '#212121',
    gray: '#757575',
    white: '#D1E2C4',
    lightGray: '#EBEBE8',
  },
  text: {
    primary: '#212121',
    secondary: '#757575',
    light: '#EBEBE8',
    white: '#fff',
  },
};

// Create dark theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: colors.primaryBlue.light,
      main: colors.primaryBlue.main,
      dark: colors.primaryBlue.dark,
      contrastText: colors.primaryBlue.contrastText,
    },
    secondary: {
      light: colors.primaryRed.light,
      main: colors.primaryRed.main,
      dark: colors.primaryRed.dark,
      contrastText: colors.primaryRed.contrastText,
    },
    success: {
      light: colors.primaryGreen.light,
      main: colors.primaryGreen.main,
      dark: colors.primaryGreen.dark,
      contrastText: colors.primaryGreen.contrastText,
    },
    text: {
      primary: colors.text.white,
      secondary: colors.neutral.lightGray,
    },
    background: {
      default: colors.neutral.gray,
      paper: colors.neutral.black,
    },
    divider: colors.neutral.gray,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

// Create light theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: colors.primaryLight.light,
      main: colors.primaryLight.main,
      dark: colors.primaryLight.dark,
      contrastText: colors.primaryLight.contrastText,
    },
    secondary: {
      light: colors.primaryRed.light,
      main: colors.primaryRed.main,
      dark: colors.primaryRed.dark,
      contrastText: colors.primaryRed.contrastText,
    },
    success: {
      light: colors.primaryGreen.light,
      main: colors.primaryGreen.main,
      dark: colors.primaryGreen.dark,
      contrastText: colors.primaryGreen.contrastText,
    },
    error: {
      light: colors.primaryRed.light,
      main: colors.primaryRed.main,
      dark: colors.primaryRed.dark,
      contrastText: colors.primaryRed.contrastText,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.neutral.gray,
    },
    background: {
      default: colors.neutral.white,
      paper: colors.neutral.lightGray,
    },
    divider: colors.neutral.lightGray,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

// Utility function to get color by path
export const getColor = (colorPath) => {
  const paths = colorPath.split('.');
  let result = colors;
  
  for (const path of paths) {
    result = result[path];
    if (result === undefined) return null;
  }
  
  return result;
};

// Export individual color palettes for direct access
export const { primaryBlue, primaryRed, primaryGreen, primaryLight, neutral, text } = colors;

// Default export
export default { darkTheme, lightTheme, colors };