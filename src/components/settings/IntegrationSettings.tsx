import { useState } from 'react';
import { WealthboxConnectForm } from '../integrations/WealthboxConnectForm';
import { useAuthStore } from '../../stores/authStore';

export const IntegrationSettings = () => {
  const { user, logout } = useAuthStore();
  const [showConnectForm, setShowConnectForm] = useState(false);

  if (showConnectForm) {
    return <WealthboxConnectForm onSuccess={() => setShowConnectForm(false)} />;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Wealthbox Integration</h3>
      {user?.isWealthboxAuthenticated ? (
        <div className="p-4 bg-green-50 rounded-md">
          <p className="text-green-700">Connected to Wealthbox</p>
          <button 
            onClick={() => logout()} // Or implement disconnect function
            className="mt-2 text-sm text-red-600 hover:underline"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowConnectForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Connect Wealthbox Account
        </button>
      )}
    </div>
  );
};