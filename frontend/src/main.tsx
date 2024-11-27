import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import { GlobalProvider } from './utilities/globalContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>
);
