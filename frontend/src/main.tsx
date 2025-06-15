import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import GlobalStyle from './styles/globalStyle.ts'
import { ThemeProvider } from 'styled-components'
import theme from './styles/theme'

import { AuthProvider } from "./contexts/AuthContext";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
