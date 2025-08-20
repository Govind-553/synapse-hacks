import ProjectSubmission from "@/components/ProjectSubmission";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface PageProps {
  user: any;
  token: string | null;
}

const ProjectSubmissionPage: React.FC<PageProps> = ({ user, token }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation user={user} logout={() => {}} />
      <main className="pt-16">
        <ProjectSubmission user={user} token={token} />
      </main>
      <Footer />
    </div>
  );
};

export default ProjectSubmissionPage;
