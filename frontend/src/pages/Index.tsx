import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import EventsShowcase from "@/components/EventsShowcase";
import Sponsors from "@/components/Sponsors";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <Features />
        <EventsShowcase />
        <Sponsors />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
