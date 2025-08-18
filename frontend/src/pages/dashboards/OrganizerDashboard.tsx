import OrganizerDashboard from "@/components/dashboards/OrganizerDashboard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const OrganizerDashboardPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <OrganizerDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default OrganizerDashboardPage;