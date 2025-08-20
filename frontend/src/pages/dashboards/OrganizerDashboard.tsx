import OrganizerDashboard from "@/components/dashboards/OrganizerDashboard";
import Navigation from "@/components/Navigation";

interface DashboardPageProps {
  user: any;
  token: string | null;
}

const OrganizerDashboardPage: React.FC<DashboardPageProps> = ({ user, token }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation user={user} logout={() => {}} />
      <main className="pt-16">
        <OrganizerDashboard user={user} token={token} />
      </main>
    </div>
  );
};

export default OrganizerDashboardPage;
