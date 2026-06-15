// API Configuration
const API_BASE_URL = import.meta.env.MODE === 'development'
  ? 'http://localhost:5000'
  : (import.meta.env.VITE_API_URL || 'https://lol-stats-app-production.up.railway.app');

export default API_BASE_URL;
