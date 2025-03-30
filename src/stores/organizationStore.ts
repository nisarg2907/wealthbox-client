import { create } from 'zustand';
import { organizationApi } from '../api/organizaton';

interface OrganizationState {
  organizations: any[];
  currentOrganization: any | null;
  loading: boolean;
  error: string | null;
  fetchAll: (token: string) => Promise<void>;
  fetchById: (id: number, token: string) => Promise<void>;
  create: (data: { name: string }, token: string) => Promise<void>;
  update: (id: number, data: { name: string }, token: string) => Promise<void>;
  delete: (id: number, token: string) => Promise<void>;
}

export const useOrganizationStore = create<OrganizationState>((set) => ({
  organizations: [],
  currentOrganization: null,
  loading: false,
  error: null,
  fetchAll: async (token) => {
    set({ loading: true, error: null });
    try {
      const response = await organizationApi.getAll(token);
      set({ organizations: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to fetch organizations', loading: false });
      throw error;
    }
  },
  fetchById: async (id, token) => {
    set({ loading: true, error: null });
    try {
      const response = await organizationApi.getById(id, token);
      set({ currentOrganization: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to fetch organization', loading: false });
      throw error;
    }
  },
  create: async (data, token) => {
    set({ loading: true, error: null });
    try {
      await organizationApi.create(data, token);
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to create organization', loading: false });
      throw error;
    }
  },
  update: async (id, data, token) => {
    set({ loading: true, error: null });
    try {
      await organizationApi.update(id, data, token);
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to update organization', loading: false });
      throw error;
    }
  },
  delete: async (id, token) => {
    set({ loading: true, error: null });
    try {
      await organizationApi.delete(id, token);
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to delete organization', loading: false });
      throw error;
    }
  }
}));