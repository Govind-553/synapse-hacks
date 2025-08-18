import LeaderboardPage from "@/components/LeaderboardPage";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <LeaderboardPage />
      </main>
      <Footer />
    </div>
  );
};

export default Leaderboard;