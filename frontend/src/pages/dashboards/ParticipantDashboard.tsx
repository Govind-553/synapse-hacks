import ParticipantDashboard from "@/components/dashboards/ParticipantDashboard";
import Navigation from "@/components/Navigation";

interface DashboardPageProps {
  user: any;
  token: string | null;
}

const ParticipantDashboardPage: React.FC<DashboardPageProps> = ({ user, token }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation user={user} logout={() => {}} />
      <main className="pt-16">
        <ParticipantDashboard user={user} token={token} />
      </main>
    </div>
  );
};

export default ParticipantDashboardPage;
