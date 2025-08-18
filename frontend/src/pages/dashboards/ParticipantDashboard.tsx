import ParticipantDashboard from "@/components/dashboards/ParticipantDashboard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ParticipantDashboardPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <ParticipantDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default ParticipantDashboardPage;