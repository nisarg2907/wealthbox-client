import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Connect = () => {
  const [token, setToken] = useState('');
  const [, setOrgId] = useState<number | null>(null);
  const navigate = useNavigate();

  const submitToken = async () => {
    try {
      const { data } = await api.post('/auth/token', { token });
      setOrgId(data.organizationId);
      localStorage.setItem('orgId', data.organizationId); // 💾 stored for future requests
      navigate('/dashboard');
    } catch (err) {
      console.error('Error saving token', err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl mb-4">Enter Wealthbox API Token</h2>
      <input
        className="w-full p-2 border mb-4"
        placeholder="Paste API token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button onClick={submitToken} className="bg-blue-600 text-white px-4 py-2 rounded">
        Connect
      </button>
    </div>
  );
};

export default Connect;
