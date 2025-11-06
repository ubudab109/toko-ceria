import axios from 'axios';

console.log('url', (import.meta as any).env.VITE_BACKEND_URL);
const api = axios.create({
  baseURL: (import.meta as any).env.VITE_BACKEND_URL,
});

export default api;
