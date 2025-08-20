import ParticipantDashboard from "@/components/dashboards/ParticipantDashboard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
      <Footer />
    </div>
  );
};

export default ParticipantDashboardPage;
