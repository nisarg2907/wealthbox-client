import OrgList from '../components/OrgList';

const OrganizationsPage = () => {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Manage Organizations</h1>
      <OrgList />
    </div>
  );
};

export default OrganizationsPage;
