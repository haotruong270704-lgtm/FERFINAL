import api from './api';
import { buildMockSession, clearStoredSession, storeSession } from '../utils/authStorage';

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone || ''
});

export const authService = {
  async login(email, password) {
    const response = await api.get('/users', {
      params: {
        email,
        password
      }
    });

    const foundUser = response.data?.[0];

    if (!foundUser) {
      const error = new Error('Email hoac mat khau khong dung.');
      error.status = 401;
      throw error;
    }

    const session = buildMockSession(sanitizeUser(foundUser));
    storeSession(session);

    return session;
  },

  logout() {
    clearStoredSession();
  }
};



