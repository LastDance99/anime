import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './i18n';
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyle from './styles/globalStyle';
import ErrorBoundary from "./components/ErrorBoundary";

const faviconEl = document.getElementById("dynamic-favicon") as HTMLLinkElement | null;
if (faviconEl) {
  faviconEl.href = import.meta.env.VITE_FAVICON_IMG;
}

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <ErrorBoundary>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </AuthProvider>
  </ErrorBoundary>
);