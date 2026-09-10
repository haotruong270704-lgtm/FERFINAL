import axios from 'axios';
import { clearStoredSession, readStoredSession } from '../utils/authStorage';

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const session = readStoredSession();

    if (session?.token) {
      config.headers.Authorization = `Bearer ${session.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      const message = 'Khong the ket noi may chu JSON Server. Hay kiem tra npm run server.';
      error.message = message;
      window.dispatchEvent(new CustomEvent('api:network-error', { detail: message }));
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      clearStoredSession();
      error.message = 'Phien dang nhap da het han. Vui long dang nhap lai.';
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    }

    if (error.response.status === 403) {
      error.message = 'Ban khong co quyen truy cap tai nguyen nay.';
      window.dispatchEvent(new CustomEvent('auth:forbidden'));
    }

    return Promise.reject(error);
  }
);

export default api;

