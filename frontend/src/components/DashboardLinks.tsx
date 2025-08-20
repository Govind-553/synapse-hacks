import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Gavel, Trophy } from "lucide-react";

// This component provides links to the three different dashboards.
const DashboardLinks = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">
          Explore Dashboards
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Click on a button below to navigate to the corresponding dashboard.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Button variant="hero" size="xl" asChild>
          <Link to="/login">
            <Users className="w-6 h-6 mr-3" />
            Participant
          </Link>
        </Button>
        <Button variant="hero" size="xl" asChild>
          <Link to="/login">
            <Gavel className="w-6 h-6 mr-3" />
            Judge
          </Link>
        </Button>
        <Button variant="hero" size="xl" asChild>
          <Link to="/login">
            <Trophy className="w-6 h-6 mr-3" />
            Organizer
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default DashboardLinks;
