import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { PollContextProvider } from './context/Poll.context';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PollContextProvider>
      <App />
    </PollContextProvider>
  </StrictMode>
);
