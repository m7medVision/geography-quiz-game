import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <audio
      src='bg.mp3'
      loop
      preload="auto"
      autoPlay
    />
    <App />
  </StrictMode>,
)
