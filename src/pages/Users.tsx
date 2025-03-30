import { useState, useEffect } from 'react';
import { ProtectedRoute } from '../components/ui/ProtectedRoutes';
import { useUserStore } from '../stores/userStore';
import { useOrganizationStore } from '../stores/organizationStore';
import { useAuthStore } from '../stores/authStore';
import { UserForm } from '../components/user/UserForm';
import { Loader } from '../components/ui/Loader';

export const UsersPage = () => {
  const { users, loading, fetchAll } = useUserStore();
  const { organizations, fetchAll: fetchOrgs } = useOrganizationStore();
  const { token } = useAuthStore();
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [selectedOrg, setSelectedOrg] = useState<number | null>(null);

  useEffect(() => {
    if (token) {
      fetchAll(undefined, token);
      fetchOrgs(token);
    }
  }, [token, fetchAll, fetchOrgs]);

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  const handleOrgFilter = (orgId: number | null) => {
    setSelectedOrg(orgId);
    fetchAll(orgId || undefined, token!);
  };

  if (loading) return <Loader />;

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Users</h1>
          <div className="flex space-x-4">
            <select
              value={selectedOrg || ''}
              onChange={(e) => handleOrgFilter(e.target.value ? parseInt(e.target.value) : null)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="">All Organizations</option>
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {showForm && (
          <UserForm 
            user={editingUser} 
            onClose={handleFormClose} 
            organizations={organizations} 
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
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Organization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {organizations.find(org => org.id === user.organizationId)?.name || 'None'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleEdit(user)}
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