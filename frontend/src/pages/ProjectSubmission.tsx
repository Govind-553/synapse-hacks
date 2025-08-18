import ProjectSubmission from "@/components/ProjectSubmission";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ProjectSubmissionPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <ProjectSubmission />
      </main>
      <Footer />
    </div>
  );
};

export default ProjectSubmissionPage;