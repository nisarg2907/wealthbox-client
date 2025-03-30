import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const authApi = {
  register: async (data: { email: string; password: string; firstName?: string; lastName?: string }) => {
    return axios.post(`${API_URL}/auth/register`, data);
  },
  login: async (data: { email: string; password: string }) => {
    return axios.post(`${API_URL}/auth/login`, data);
  },
  getCurrentUser: async (token: string) => {
    return axios.get(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
};