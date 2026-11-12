import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Initialize Cloudflare Web Analytics in production if a token is configured
const cfBeaconToken = import.meta.env.VITE_CF_BEACON_TOKEN?.trim();
if (import.meta.env.PROD && cfBeaconToken) {
  const script = document.createElement('script');
  script.defer = true;
  script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  script.setAttribute('data-cf-beacon', JSON.stringify({ token: cfBeaconToken, spa: true }));
  document.head.appendChild(script);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

