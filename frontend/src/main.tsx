import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TodosApiClientService } from './services/TodosApiClientService.ts'

TodosApiClientService.setBaseURL('/api')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
