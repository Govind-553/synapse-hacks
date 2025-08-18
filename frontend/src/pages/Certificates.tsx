import CertificatesPage from "@/components/CertificatesPage";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Certificates = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <CertificatesPage />
      </main>
      <Footer />
    </div>
  );
};

export default Certificates;