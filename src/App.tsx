import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { OrganizationsPage } from './pages/Organizations';
import { UsersPage } from './pages/Users';
import { IntegrationsPage } from './pages/Integrations';
import { Header } from './components/ui/Header';
import { useEffect } from 'react';
import { useAuthStore } from './stores/authStore';

function App() {
  const { fetchCurrentUser, token } = useAuthStore();

  useEffect(() => {
    if (token) {
      fetchCurrentUser();
    }
  }, [token, fetchCurrentUser]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/organizations" element={<OrganizationsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/integrations" element={<IntegrationsPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;