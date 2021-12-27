import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { CssBaseline, StyledEngineProvider } from '@mui/material'

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider>
      <CssBaseline />
      <App />
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
