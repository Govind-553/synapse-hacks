import AnnouncementsPage from "@/components/AnnouncementsPage";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface PageProps {
  user: any;                
  token: string | null;
}

const Announcements: React.FC<PageProps> = ({ user, token }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation user={user} logout={() => {}} />
      <main className="pt-16">
        <AnnouncementsPage user={user} token={token} />
      </main>
      <Footer />
    </div>
  );
};

export default Announcements;
