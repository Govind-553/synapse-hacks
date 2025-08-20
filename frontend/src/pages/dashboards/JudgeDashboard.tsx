import JudgeDashboard from "@/components/dashboards/JudgeDashboard";
import Navigation from "@/components/Navigation";

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
    </div>
  );
};

export default JudgeDashboardPage;
