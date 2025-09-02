import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Suppress some console noise from browser extensions
const originalError = console.error;
console.error = (...args) => {
  // Filter out common browser extension errors that are not related to our app
  const message = args[0];
  if (typeof message === 'string') {
    if (message.includes('extension') || 
        message.includes('chrome-extension') || 
        message.includes('message port closed') ||
        message.includes('runtime.lastError')) {
      return; // Suppress extension-related errors
    }
  }
  originalError.apply(console, args);
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
