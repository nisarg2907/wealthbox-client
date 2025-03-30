import { useEffect, useState } from 'react';
import api from '../api';
import OrgForm from './orgForm';

type Org = {
  id: number;
  name: string;
  externalId: number;
};

const OrgList = () => {
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [editingOrg, setEditingOrg] = useState<Org | null>(null);

  const fetchOrgs = async () => {
    try {
      const { data } = await api.get('/orgs');
      setOrgs(data);
    } catch (err) {
      console.error('Failed to load orgs:', err);
    }
  };

  useEffect(() => {
    fetchOrgs();
  }, []);

  return (
    <div className="p-6">
      {!editingOrg && <OrgForm onSuccess={fetchOrgs} />}
      <h2 className="text-2xl font-bold mt-6 mb-4">Organizations</h2>
      <ul>
        {orgs.map((org) => (
          <li key={org.id} className="mb-2 flex justify-between items-center">
            <span>{org.name}</span>
            <button
              onClick={() => setEditingOrg(org)}
              className="text-sm text-blue-600 hover:underline"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>

      {editingOrg && (
        <div className="mt-6">
          <OrgForm
            org={editingOrg}
            onSuccess={() => {
              setEditingOrg(null);
              fetchOrgs();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default OrgList;
