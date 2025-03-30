import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const userApi = {
  getAll: async (organizationId?: number, token?: string) => {
    return axios.get(`${API_URL}/users`, {
      params: { organizationId },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },
  getById: async (id: number, token: string) => {
    return axios.get(`${API_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },
  update: async (id: number, data: unknown, token: string) => {
    return axios.put(`${API_URL}/users/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },
  delete: async (id: number, token: string) => {
    return axios.delete(`${API_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },
  assignToOrganization: async (userId: number, organizationId: number, token: string) => {
    return axios.put(`${API_URL}/users/${userId}/organization`, { organizationId }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
};