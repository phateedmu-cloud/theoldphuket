// Example theme - adjust to match The Old Phuket's design system
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#YOUR_PRIMARY_COLOR', // Replace with The Old Phuket's primary color
    },
    secondary: {
      main: '#YOUR_SECONDARY_COLOR', // Replace with The Old Phuket's secondary color
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Replace with The Old Phuket's font family
    h2: {
      fontWeight: 700,
    },
  },
});

export default theme;
