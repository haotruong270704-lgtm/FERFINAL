import api from './api';

export const usersService = {
  async getUsers(params = {}) {
    const response = await api.get('/users', { params });
    return response.data;
  },

  async getUserById(id) {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  async createUser(payload) {
    const response = await api.post('/users', payload);
    return response.data;
  },

  async updateUser(id, payload) {
    const response = await api.put(`/users/${id}`, payload);
    return response.data;
  },

  async deleteUser(id) {
    await api.delete(`/users/${id}`);
  }
};


