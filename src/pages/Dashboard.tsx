import { ProtectedRoute } from "../components/ui/ProtectedRoutes";
import { WealthboxConnectForm } from '../components/integrations/WealthboxConnectForm';
import { useAuthStore } from '../stores/authStore';

export const Dashboard = () => {
  const { user } = useAuthStore();

  if (!user?.isWealthboxAuthenticated) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-yellow-700">Connect your Wealthbox account to access all features</p>
        </div>
        <WealthboxConnectForm />
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user?.firstName || user?.email}!</h2>
          <p className="text-gray-700">
            {user?.isAdmin
              ? 'You have administrator privileges.'
              : 'You can view and manage your assigned organizations.'}
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
};