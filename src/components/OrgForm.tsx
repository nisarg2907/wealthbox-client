import { useState, useEffect } from 'react';
import api from '../api';

type Org = {
  id: number;
  name: string;
  externalId: number;
};

type Props = {
  onSuccess: () => void;
  org?: Org;
};

const OrgForm = ({ org, onSuccess }: Props) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (org) {
      setName(org.name);
    }
  }, [org]);

  const handleSubmit = async () => {
    try {
      if (org) {
        // Update
        await api.put(`/orgs/${org.externalId}`, { name });
      } else {
        // Create
        await api.post('/orgs', { name });
      }
      setName('');
      onSuccess();
    } catch (err) {
      console.error('Error submitting org:', err);
    }
  };

  return (
    <div className="p-4 border rounded bg-white shadow">
      <h2 className="text-xl font-semibold mb-4">
        {org ? 'Edit Organization' : 'Create Organization'}
      </h2>
      <input
        className="border p-2 w-full mb-3"
        placeholder="Organization Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {org ? 'Update' : 'Create'}
      </button>
    </div>
  );
};

export default OrgForm;
