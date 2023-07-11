import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#00C7E6',
      // main: '#0042BF',
      contrastText: '#DDE6ED',
    },
    secondary: {
      main: '#F79B19',
      // contrastText: '#DDE6ED',
    },
    background: {
      default: '#ffffff', // Light background color
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
    primary: {
      main: '#00C7E6',
      // main: '#0042BF',
      // contrastText: '#DDE6ED',
    },
    secondary: {
      main: '#F79B19',
      // contrastText: '#DDE6ED',
    },
    background: {
      default: '#212121', // Override the default background color
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

export { lightTheme, darkTheme };
