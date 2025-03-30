import { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import {  Navigate } from 'react-router-dom';
import { Loader } from './Loader';

export const ProtectedRoute = ({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) => {
  const { token, user, loading, fetchCurrentUser } = useAuthStore();
//   const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // If there's no token, we'll handle this with a return statement below
      if (!token) {
        setIsChecking(false);
        return;
      }

      // If we have a token but no user, fetch the user
      if (!user) {
        try {
          await fetchCurrentUser();
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      }
      
      setIsChecking(false);
    };

    checkAuth();
  }, [token, user, fetchCurrentUser]);

  // Show loader while checking auth status or while the global loading state is true
  if (loading || isChecking) {
    return <Loader />;
  }

  // Handle no token case - redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

//   // Handle admin-only routes
//   if (adminOnly && user && !user.isAdmin) {
//     return <Navigate to="/" replace />;
//   }

  // If we passed all checks, render the children
  return <>{children}</>;
};