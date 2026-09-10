import api from './api';

export const locationsService = {
  async getLocations(params = {}) {
    const response = await api.get('/locations', { params });
    return response.data;
  },

  async getLocationById(id) {
    const response = await api.get(`/locations/${id}`);
    return response.data;
  },

  async createLocation(payload) {
    const response = await api.post('/locations', payload);
    return response.data;
  },

  async updateLocation(id, payload) {
    const response = await api.put(`/locations/${id}`, payload);
    return response.data;
  },

  async deleteLocation(id) {
    await api.delete(`/locations/${id}`);
  }
};


