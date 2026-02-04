import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Redux provider
import { Provider } from 'react-redux';
import { store } from './store';
// ⬅️ Ensure the case matches the file name: ThemeWatcher.tsx
import { ThemeWatcher } from './themewatcher';

// Your existing global CSS
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeWatcher />
      <App />
    </Provider>
  </React.StrictMode>
);