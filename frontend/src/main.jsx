import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import './index.css'
import App from './App.jsx'

// Force light theme permanently
document.documentElement.classList.remove('dark');
localStorage.removeItem('theme');
document.documentElement.style.setProperty('--sidebar-bg', '#ffffff');
document.documentElement.style.setProperty('--sidebar-border', '#e2e8f0');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)

