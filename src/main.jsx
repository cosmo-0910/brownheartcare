import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SiteSettingsProvider } from './context/SiteSettingsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SiteSettingsProvider>
      <App />
    </SiteSettingsProvider>
  </React.StrictMode>,
)

