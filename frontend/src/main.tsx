import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import LoginProvider from './contexts/LoginProvider.tsx'
import ServiceProvider from './contexts/ServiceProvider.tsx'
import './index.css'

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

createRoot(root).render(
  <StrictMode>
    <ServiceProvider>
      <LoginProvider>
        <App />
        <Toaster />
      </LoginProvider>
    </ServiceProvider>
  </StrictMode>
)
