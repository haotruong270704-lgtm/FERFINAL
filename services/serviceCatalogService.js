import api from './api';

export const serviceCatalogService = {
  async getServices(params = {}) {
    const response = await api.get('/services', { params });
    return response.data;
  },

  async getServicesByLocation(locationId) {
    const response = await api.get('/services', {
      params: {
        locationId
      }
    });

    return response.data;
  },

  async getServiceById(id) {
    const response = await api.get(`/services/${id}`);
    return response.data;
  },

  async createService(payload) {
    const response = await api.post('/services', payload);
    return response.data;
  },

  async updateService(id, payload) {
    const response = await api.put(`/services/${id}`, payload);
    return response.data;
  },

  async deleteService(id) {
    await api.delete(`/services/${id}`);
  }
};


