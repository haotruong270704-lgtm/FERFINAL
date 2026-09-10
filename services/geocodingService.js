import axios from 'axios';

const geocodingClient = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org',
  timeout: 10000
});

export const geocodingService = {
  async searchAddress(query) {
    const response = await geocodingClient.get('/search', {
      params: {
        q: `${query}, Da Nang, Viet Nam`,
        format: 'json',
        limit: 1,
        addressdetails: 1
      }
    });

    return response.data?.[0] || null;
  }
};
