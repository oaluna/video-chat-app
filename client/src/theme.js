import { createMuiTheme } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  card: {
    background: 'rgba( 255, 255, 255, 0.4 )',
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur( 3.3px )',
    borderRadius: '15px'
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  },
  palette: {
    primary: {
      light: '#2a69fe',
      main: '#635bff',
      dark: '#06182C',
      contrastText: '#fff'
    },
    secondary: {
      light: '#F9A000',
      main: '#FF5D00',
      dark: '#ED0006',
      contrastText: '#000'
    },
    openTitle: '#06182C',
    protectedTitle: teal['400'],
    type: 'dark'
  },
  overrides: {
    MuiButton: {
      background: 'rgba( 255, 255, 255, 0.4 )',
      boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
      backdropFilter: 'blur( 3.3px )',
      borderRadius: '10px'
    },


  }
});

export default theme;
