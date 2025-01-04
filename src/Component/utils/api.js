import axios from 'axios';

const isProduction = window.location.hostname !== 'localhost';
const api = axios.create({
  baseURL: isProduction
    ? 'https://examsback-end-production.up.railway.app'
    : 'http://localhost:8000',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;