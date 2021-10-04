import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';

/*
  --main-primary: #92140c;
  --main-primary-light: #c94a34;
  --main-primary-dark: #5e0000;
*/

/*
  --main-primary: #2a0a00;
  --main-primary-light: #54312c;
*/
const theme = createTheme({
  palette: {
    primary: {
      main: '#92140c',
      light: '#c94a34',
      dark: '#5e0000'
    },
    secondary: {
      main: '#c1b4ae',
      light: '#f4e6e0',
      dark: '#91847f'
    }
  },
  typography: {
    fontFamily: ['AvQest', 'serif'].join(','),
    fontSize: 18,
    h6: {
      fontWeight: 900
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
