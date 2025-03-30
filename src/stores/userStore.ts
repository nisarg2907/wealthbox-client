import { create } from 'zustand';
import { userApi } from '../api/user';

interface UserState {
  users: any[];
  currentUser: any | null;
  loading: boolean;
  error: string | null;
  fetchAll: (organizationId?: number, token?: string) => Promise<void>;
  fetchById: (id: number, token: string) => Promise<void>;
  update: (id: number, data: any, token: string) => Promise<void>;
  delete: (id: number, token: string) => Promise<void>;
  assignToOrganization: (userId: number, organizationId: number, token: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  currentUser: null,
  loading: false,
  error: null,
  fetchAll: async (organizationId, token) => {
    set({ loading: true, error: null });
    try {
      const response = await userApi.getAll(organizationId, token);
      set({ users: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to fetch users', loading: false });
      throw error;
    }
  },
  fetchById: async (id, token) => {
    set({ loading: true, error: null });
    try {
      const response = await userApi.getById(id, token);
      set({ currentUser: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to fetch user', loading: false });
      throw error;
    }
  },
  update: async (id, data, token) => {
    set({ loading: true, error: null });
    try {
      await userApi.update(id, data, token);
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to update user', loading: false });
      throw error;
    }
  },
  delete: async (id, token) => {
    set({ loading: true, error: null });
    try {
      await userApi.delete(id, token);
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to delete user', loading: false });
      throw error;
    }
  },
  assignToOrganization: async (userId, organizationId, token) => {
    set({ loading: true, error: null });
    try {
      await userApi.assignToOrganization(userId, organizationId, token);
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to assign user', loading: false });
      throw error;
    }
  }
}));