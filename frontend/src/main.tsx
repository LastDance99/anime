import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './i18n';
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/globalStyle';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </AuthProvider>
);