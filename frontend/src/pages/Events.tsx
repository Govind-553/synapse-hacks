import EventsShowcase from "../components/EventsShowcase";
import Navigation from "../components/Navigation";

interface PageProps {
  user: any;
  token: string | null;
}

const EventsPage: React.FC<PageProps> = ({ user, token }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation user={user} logout={() => {}} />
      <main className="pt-16">
        <EventsShowcase />
      </main>
    </div>
  );
};

export default EventsPage;
