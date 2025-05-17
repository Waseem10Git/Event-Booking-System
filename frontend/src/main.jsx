import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './variables.css'
import App from './App.jsx'
import './i18n';
import { AuthContextProvider } from './Context/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </StrictMode>,
)
