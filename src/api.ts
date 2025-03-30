import axios from 'axios';

const orgId = localStorage.getItem('orgId');

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'x-org-id': orgId || '',
  },
});

export default api;
