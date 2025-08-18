import AnnouncementsPage from "@/components/AnnouncementsPage";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Announcements = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <AnnouncementsPage />
      </main>
      <Footer />
    </div>
  );
};

export default Announcements;