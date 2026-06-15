// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://lol-stats-app-production.up.railway.app');

export default API_BASE_URL;
