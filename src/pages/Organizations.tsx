import { useState, useEffect } from 'react';
import { ProtectedRoute } from '../components/ui/ProtectedRoutes';
import { useOrganizationStore } from '../stores/organizationStore';
import { useAuthStore } from '../stores/authStore';
import { OrganizationForm } from '../components/organizations/OrganizationForm';
import { Loader } from '../components/ui/Loader';

export const OrganizationsPage = () => {
  const { organizations, loading, fetchAll } = useOrganizationStore();
  const { token } = useAuthStore();
  const [showForm, setShowForm] = useState(false);
  const [editingOrg, setEditingOrg] = useState<any>(null);

  useEffect(() => {
    if (token) {
      fetchAll(token);
    }
  }, [token, fetchAll]);

  const handleEdit = (org: any) => {
    setEditingOrg(org);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingOrg(null);
  };

  if (loading) return <Loader />;

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Organizations</h1>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Organization
          </button>
        </div>

        {showForm && (
          <OrganizationForm 
            organization={editingOrg} 
            onClose={handleFormClose} 
          />
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.isArray(organizations) && organizations.length > 0 && organizations.map((org) => (
                <tr key={org.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{org.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleEdit(org)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
};