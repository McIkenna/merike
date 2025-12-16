import { createTheme } from '@mui/material/styles';

// Define color shades as exportable constants
export const colors = {
  primaryBlue: {
    light: '#82a6d5',
    main: '#044CAB',
    dark: '#022656',
    contrastText: '#d3eaf3fe',
  },
  primaryRed: {
    light: '#fed8d8',
    main: '#FB3D3D',
    dark: '#6c1a1a',
    contrastText: '#ffeeee',
  },
  primaryGreen: {
    light: '#b8d1c1',
    main: '#69f0ae',
    dark: '#0b4b22ff',
    moredark: '#062712ff',
    contrastText: '#e7f0ea',
  },
  primaryLight: {
    light: '#B5E5CF',
    main: '#fff',
    dark: '#FCB5AC',
    contrastText: '#212121',
  },
  neutral: {
    black: '#212121',
    darkGray: '#777676ff',
    gray: '#bdbdbdff',
    white: '#ffffffff',
    lightGray: '#e3e3e3ff',
  },
  text: {
    primary: '#212121',
    secondary: '#757575',
    light: '#03ad77ff',
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
      main: colors.primaryRed.light,
      dark: colors.primaryRed.dark,
      contrastText: colors.primaryRed.contrastText,
    },
    success: {
      light: colors.primaryGreen.light,
      main: colors.primaryGreen.dark,
      dark: colors.primaryGreen.moredark,
      contrastText: colors.primaryGreen.contrastText,
    },
    text: {
      primary: colors.text.white,
      secondary: colors.text.primary,
      light: colors.text.light,
      white: colors.text.secondary

    },
    background: {
      default: colors.neutral.gray,
      paper: colors.neutral.darkGray,
      dark: colors.neutral.black,
    },
    divider: {
      main: colors.neutral.gray,
      dark: colors.neutral.darkGray,
      black: colors.neutral.black,
    }
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
      light: colors.primaryBlue.contrastText,
      main: colors.primaryBlue.light,
      dark: colors.primaryBlue.main,
      contrastText: colors.primaryLight.contrastText,
    },
    secondary: {
      light: colors.primaryRed.contrastText,
      main: colors.primaryRed.light,
      dark: colors.primaryRed.main,
      contrastText: colors.primaryRed.contrastText,
    },
    success: {
      light: colors.primaryGreen.contrastText,
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
      secondary: colors.text.black,
      light: colors.text.light,
      white: colors.text.white
    },
    background: {
      default: colors.neutral.white,
      paper: colors.neutral.lightGray,
      dark: colors.neutral.darkGray,
    },
    divider: {
      main: colors.neutral.lightGray,
      dark: colors.neutral.gray,
      black: colors.neutral.darkGray,
    }
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