import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const organizationApi = {
  getAll: async (token: string) => {
    return axios.get(`${API_URL}/organizations`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },
  getById: async (id: number, token: string) => {
    return axios.get(`${API_URL}/organizations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },
  create: async (data: { name: string }, token: string) => {
    return axios.post(`${API_URL}/organizations`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },
  update: async (id: number, data: { name: string }, token: string) => {
    return axios.put(`${API_URL}/organizations/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },
  delete: async (id: number, token: string) => {
    return axios.delete(`${API_URL}/organizations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
};