import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Sponsors from "../components/Sponsors";
import DashboardLinks from "../components/DashboardLinks";

interface PageProps {
  user: any;
  token: string | null;
} 

const Index: React.FC<PageProps> = ({ user, token }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation user={user} logout={() => {}} />
      <main>
        <Hero />
        <DashboardLinks />
        <Features />
        <Sponsors />
      </main>
    </div>
  );
};

export default Index;
