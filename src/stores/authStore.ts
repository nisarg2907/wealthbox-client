import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { authApi } from '../api/auth';
import axios from 'axios';

interface AuthState {
  token: string | null;
  user: any | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  logout: () => void;
  fetchCurrentUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      loading: false,
      error: null,
      login: async (email, password) => {
        console.log('Login attempt:', { email });
        set({ loading: true, error: null });
        try {
          const response = await authApi.login({ email, password });
          console.log('Login successful:', response.data);
          
          // Make sure the data structure matches what you're expecting
          const token = response.data.token || response.data.data?.token;
          const user = response.data.user || response.data.data?.user;
          
          // Update state with the extracted values
          set({ 
            token: token, 
            user: user, 
            loading: false 
          });
          
          // Debug after setting state
          console.log('State after login:', get());
          console.log('LocalStorage after login:', localStorage.getItem('auth-storage'));
        } catch (error: any) {
          console.error('Login failed:', error);
          set({ error: error.response?.data?.message || 'Login failed', loading: false });
          throw error;
        }
      },
      register: async (email, password, firstName, lastName) => {
        console.log('Registration attempt:', { email, firstName, lastName });
        set({ loading: true, error: null });
        try {
          const response = await authApi.register({ email, password, firstName, lastName });
          console.log('Registration successful:', response.data);
          
          // Similar data extraction as in login
          const token = response.data.token || response.data.data?.token;
          const user = response.data.user || response.data.data?.user;
          
          set({ token: token, user: user, loading: false });
        } catch (error: any) {
          console.error('Registration failed:', error);
          set({ error: error.response?.data?.message || 'Registration failed', loading: false });
          throw error;
        }
      },
      
      logout: () => {
        console.log('Logout');
        set({ token: null, user: null });
      },
      fetchCurrentUser: async () => {
        console.log('Fetching current user');
        set({ loading: true });
        try {
          const token = get().token;
          if (!token) {
            console.log('No token found');
            set({ loading: false });
            return;
          }
          const response = await authApi.getCurrentUser(token);
          console.log('Fetched current user:', response.data);
          set({ user: response.data.user || response.data, loading: false });
        } catch (error) {
          console.error('Fetching current user failed:', error);
          set({ token: null, user: null, loading: false });
        }
      },
      connectWealthbox: async (apiToken: string) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post('/api/auth/connect-wealthbox', { apiToken }, {
            headers: {
              Authorization: `Bearer ${get().token}`
            }
          });
          set({ 
            user: { ...get().user, ...response.data },
            loading: false 
          });
          return response.data;
        } catch (error: any) {
          set({ 
            error: error.response?.data?.message || 'Failed to connect Wealthbox', 
            loading: false 
          });
          throw error;
        }
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        token: state.token, 
        user: state.user 
      }),
    }
  )
);

// Add this to verify persistence is working
// Call this when your app initializes
export const checkPersistedAuth = () => {
  const stored = localStorage.getItem('auth-storage');
  console.log('Stored auth data:', stored);
  if (stored) {
    try {
      const parsedState = JSON.parse(stored);
      console.log('Parsed state from storage:', parsedState);
      
      // You can manually rehydrate if needed
      if (parsedState.state?.token) {
        console.log('Found token in storage, state should be hydrated');
      }
    } catch (e) {
      console.error('Error parsing stored auth data:', e);
    }
  }
};