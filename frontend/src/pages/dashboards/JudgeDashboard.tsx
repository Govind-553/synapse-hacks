import JudgeDashboard from "@/components/dashboards/JudgeDashboard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const JudgeDashboardPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <JudgeDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default JudgeDashboardPage;