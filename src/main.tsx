import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from './App';
import { MyListProvider } from './context/MyListContext';
import './styles/global.css';

// Sandboxed hosts (e.g. embedded previews) can't use URL routing; build with
// VITE_ROUTER=memory to keep navigation in memory instead.
const Router = import.meta.env.VITE_ROUTER === 'memory' ? MemoryRouter : BrowserRouter;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <MyListProvider>
        <App />
      </MyListProvider>
    </Router>
  </StrictMode>,
);
