import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    paletteName: 'light',
    primary: {
      main: '#00C7E6',
      contrastText: '#DDE6ED',
    },
    secondary: {
      main: '#F79B19',
    },
    background: {
      default: '#ffffff',
    },
  },
  additionalPalette: {
    primary: '#F0F0F0',
    secondary: '#CCCCCC',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    paletteName: 'dark',
    primary: {
      main: '#00C7E6',
    },
    secondary: {
      main: '#F79B19',
    },
    background: {
      default: '#212121',
    },
  },
  additionalPalette: {
    primary: '#102A43',
    secondary: '#0D1C2B',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

const earthTheme = createTheme({
  palette: {
    // mode: 'earth',
    paletteName: 'earth',
    primary: {
      main: '#7CBA7A', // Moss green
    },
    secondary: {
      main: '#004E64', // Deep ocean blue
    },
    background: {
      default: '#D2B48C', // Sandy beige
    },
  },
  additionalPalette: {
    primary: '#8B3E23', // Earthy tone red
    secondary: '#964B00', // Earthy brown
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

const sunTheme = createTheme({
  palette: {
    // mode: 'sun',
    paletteName: 'sun',
    primary: {
      main: '#FFD700',
    },
    secondary: {
      main: '#DAA520',
    },
    background: {
      default: '#FF7F50',
    },
  },
  additionalPalette: {
    primary: '#FF4500',
    secondary: '#FF6600',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

export { lightTheme, darkTheme, earthTheme, sunTheme };
