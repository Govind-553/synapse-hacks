import EventsShowcase from "@/components/EventsShowcase";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const EventsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <EventsShowcase />
      </main>
      <Footer />
    </div>
  );
};

export default EventsPage;