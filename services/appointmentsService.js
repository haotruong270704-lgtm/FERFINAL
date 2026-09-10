import api from './api';

export const appointmentsService = {
  async getAppointments(params = {}) {
    const response = await api.get('/appointments', { params });
    return response.data;
  },

  async getAppointmentsByUser(userId) {
    const response = await api.get('/appointments', {
      params: {
        userId,
        _sort: 'createdAt',
        _order: 'desc'
      }
    });

    return response.data;
  },

  async getAppointmentById(id) {
    const response = await api.get(`/appointments/${id}`);
    return response.data;
  },

  async createAppointment(payload) {
    const response = await api.post('/appointments', payload);
    return response.data;
  },

  async updateAppointment(id, payload) {
    const response = await api.put(`/appointments/${id}`, payload);
    return response.data;
  },

  async deleteAppointment(id) {
    await api.delete(`/appointments/${id}`);
  }
};


