import { create } from 'zustand';
import { integrationApi } from '../api/integration';

interface IntegrationState {
  config: any | null;
  loading: boolean;
  error: string | null;
  syncResult: any | null;
  syncWealthboxUsers: (organizationId: number, token: string) => Promise<void>;
  configureIntegration: (data: any, token: string) => Promise<void>;
  getIntegrationConfig: (organizationId: number, token: string) => Promise<void>;
}

export const useIntegrationStore = create<IntegrationState>((set) => ({
  config: null,
  loading: false,
  error: null,
  syncResult: null,
  syncWealthboxUsers: async (organizationId, token) => {
    set({ loading: true, error: null });
    try {
      const response = await integrationApi.syncWealthboxUsers(organizationId, token);
      set({ syncResult: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to sync users', loading: false });
      throw error;
    }
  },
  configureIntegration: async (data, token) => {
    set({ loading: true, error: null });
    try {
      const response = await integrationApi.configureIntegration(data, token);
      set({ config: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to configure integration', loading: false });
      throw error;
    }
  },
  getIntegrationConfig: async (organizationId, token) => {
    set({ loading: true, error: null });
    try {
      const response = await integrationApi.getIntegrationConfig(organizationId, token);
      set({ config: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to get integration config', loading: false });
      throw error;
    }
  }
}));