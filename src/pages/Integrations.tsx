import { WealthboxSync } from '../components/integrations/WealthboxSync';
import { ProtectedRoute } from '../components/ui/ProtectedRoutes';

export const IntegrationsPage = () => {
  return (
    <ProtectedRoute adminOnly>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Integrations</h1>
        <WealthboxSync />
      </div>
    </ProtectedRoute>
  );
};