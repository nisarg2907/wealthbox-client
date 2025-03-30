import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export const Header = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          Vitals AI
        </Link>
        
        <nav className="flex items-center space-x-6">
          {user ? (
            <>
              <Link to="/" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
              <Link to="/organizations" className="text-gray-700 hover:text-blue-600">
                Organizations
              </Link>
              <Link to="/users" className="text-gray-700 hover:text-blue-600">
                Users
              </Link>
              {user.isAdmin && (
                <Link to="/integrations" className="text-gray-700 hover:text-blue-600">
                  Integrations
                </Link>
              )}
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link to="/register" className="text-gray-700 hover:text-blue-600">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};