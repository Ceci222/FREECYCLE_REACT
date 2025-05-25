import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx'; // Si no envuelvo la aplicación ene se contexto, el contexto se considera vacío y no funciona

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> 
      <App />
    </AuthProvider>
  </StrictMode>,
);

