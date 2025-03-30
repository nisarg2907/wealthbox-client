import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const integrationApi = {
  syncWealthboxUsers: async (organizationId: number, token: string) => {
    return axios.post(`${API_URL}/integrations/wealthbox/sync`, { organizationId }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },
  configureIntegration: async (data: unknown, token: string) => {
    return axios.post(`${API_URL}/integrations/config`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },
  getIntegrationConfig: async (organizationId: number, token: string) => {
    return axios.get(`${API_URL}/integrations/config/${organizationId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
};