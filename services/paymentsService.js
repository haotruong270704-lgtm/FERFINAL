import api from './api';

export const paymentsService = {
  async getPayments(params = {}) {
    const response = await api.get('/payments', { params });
    return response.data;
  },

  async createPayment(payload) {
    const response = await api.post('/payments', payload);
    return response.data;
  },

  async updatePayment(id, payload) {
    const response = await api.put(`/payments/${id}`, payload);
    return response.data;
  },

  async deletePayment(id) {
    await api.delete(`/payments/${id}`);
  }
};


