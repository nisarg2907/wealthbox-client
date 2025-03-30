import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Connect from './pages/Connect';
import Dashboard from './pages/DashBoard';
import OrganizationsPage from './pages/OrganizationsPage';

function App() {
  const token = localStorage.getItem('orgId');

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Connect />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orgs" element={<OrganizationsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
