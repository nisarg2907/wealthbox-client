import { Navigate } from "react-router-dom";
import { WealthboxConnectForm } from "../components/integrations/WealthboxConnectForm";
import { useAuthStore } from '../stores/authStore';

export const ConnectWealthboxPage = () => {
  const { user } = useAuthStore();
  
  if (user?.isWealthboxAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <WealthboxConnectForm />
    </div>
  );
};