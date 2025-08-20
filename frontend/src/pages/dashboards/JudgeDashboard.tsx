import JudgeDashboard from "@/components/dashboards/JudgeDashboard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface DashboardPageProps {
  user: any;
  token: string | null;
}

const JudgeDashboardPage: React.FC<DashboardPageProps> = ({ user, token }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation user={user} logout={() => {}} />
      <main className="pt-16">
        <JudgeDashboard user={user} token={token} />
      </main>
      <Footer />
    </div>
  );
};

export default JudgeDashboardPage;
