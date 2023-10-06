import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import Layaut from './Layaut';
import './style.css';
import customTheme from './Theme';
import { ThemeProvider } from '@mui/material';
import StoreProvider from './Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <ThemeProvider theme={customTheme}>
      <StoreProvider>
        <Layaut />
      </StoreProvider>
    </ThemeProvider>
  </StrictMode>,
);
