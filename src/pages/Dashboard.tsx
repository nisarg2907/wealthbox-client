import { useEffect, useState } from 'react';
import api from '../api';

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const orgId = localStorage.getItem('orgId');
      const { data } = await api.get('/users', {
        headers: {
          'x-org-id': orgId,
        },
      });
      setUsers(data.users || []);
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Users from Wealthbox</h2>
      <ul>
        {users.map((u: { name: string; email: string }) => (
          <li key={u.email}>{u.name} ({u.email})</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
