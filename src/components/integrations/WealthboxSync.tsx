import { useState } from 'react';
import { useIntegrationStore } from '../../stores/integrationStore';
import { useAuthStore } from '../../stores/authStore';
// import { Loader } from '../ui/Loader';

export const WealthboxSync = () => {
  const [organizationId, setOrganizationId] = useState('');
  const { syncWealthboxUsers, loading, error, syncResult } = useIntegrationStore();
  const { token } = useAuthStore();

  const handleSync = async () => {
    if (!organizationId || !token) return;
    await syncWealthboxUsers(parseInt(organizationId), token);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Wealthbox Sync</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Organization ID
        </label>
        <input
          type="number"
          value={organizationId}
          onChange={(e) => setOrganizationId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Enter organization ID"
        />
      </div>
      
      <button
        onClick={handleSync}
        disabled={loading}
        className={`px-4 py-2 rounded-md text-white ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {loading ? 'Syncing...' : 'Sync Users'}
      </button>
      
      {error && <p className="mt-2 text-red-500">{error}</p>}
      
      {syncResult && (
        <div className="mt-4 p-4 bg-green-50 rounded-md">
          <p className="text-green-700">
            Sync successful! Created: {syncResult.created}, Updated: {syncResult.updated}
          </p>
        </div>
      )}
    </div>
  );
};