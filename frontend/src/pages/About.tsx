import AboutPage from "@/components/AboutPage";
import Navigation from "@/components/Navigation";

interface PageProps {
  user: any;
  token: string | null;
}

const About: React.FC<PageProps> = ({ user, token }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation user={user} logout={() => {}} />
      <main className="pt-16">
        <AboutPage />
      </main>
    </div>
  );
};

export default About;
