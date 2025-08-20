import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Trophy, Users, ExternalLink } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const API_BASE_URL = "https://synapse-hacks-api.onrender.com/api";

const EventsShowcase = ({ user, token }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [useStaticData, setUseStaticData] = useState(true);

  // Hardcoded static data as requested to not be removed.
  const staticEvents = [
    {
      id: 1,
      title: "AI Innovation Challenge",
      date: "March 15-17, 2024",
      type: "Online",
      participants: 500,
      prize: "$25,000",
      description: "Build AI solutions that solve real-world problems using machine learning and deep learning technologies.",
      tags: ["AI/ML", "Innovation", "Remote"],
      status: "upcoming",
      registrationDeadline: "March 10, 2024",
    },
    {
      id: 2,
      title: "Blockchain Summit Hack",
      date: "April 22-24, 2024",
      type: "San Francisco, CA",
      participants: 300,
      prize: "$50,000",
      description: "Create decentralized applications and explore the future of Web3 technologies.",
      tags: ["Blockchain", "Web3", "DeFi"],
      status: "upcoming",
      registrationDeadline: "April 15, 2024",
    },
    {
      id: 3,
      title: "Sustainable Tech Hackathon",
      date: "May 8-10, 2024",
      type: "Hybrid",
      participants: 750,
      prize: "$30,000",
      description: "Develop technology solutions for environmental sustainability and climate change.",
      tags: ["Sustainability", "Climate", "GreenTech"],
      status: "upcoming",
      registrationDeadline: "May 1, 2024",
    },
  ];

  useEffect(() => {
    if (useStaticData) {
      setEvents(staticEvents);
      return;
    }
    
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/events`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch events.");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, [token, useStaticData]);

  const handleRegister = async (eventId) => {
    if (!user || !token) {
      toast({
        title: "Registration Failed",
        description: "You must be logged in to register for an event.",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/events/${eventId}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to register for the event.");
      }

      toast({
        title: "Success",
        description: "Successfully registered for the event!",
      });

    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const displayedEvents = useStaticData ? staticEvents : events;

  if (isLoading) {
    return <div>Loading events...</div>;
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Upcoming</span> Events
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join exciting hackathons and compete with developers worldwide. 
            Choose from online, offline, or hybrid events.
          </p>
          <Button onClick={() => setUseStaticData(!useStaticData)} className="mt-4">
            {useStaticData ? "Switch to Live Data" : "Switch to Static Data"}
          </Button>
        </div>

        {/* Events Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {displayedEvents.map((event, index) => (
            <Card 
              key={event.id} 
              className="premium-card group h-full flex flex-col"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-3">
                  <Badge 
                    variant={event.status === "upcoming" ? "default" : "secondary"}
                    className="capitalize"
                  >
                    {event.status}
                  </Badge>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gradient">{event.prize_pool || event.prize}</div>
                    <div className="text-xs text-muted-foreground">Prize Pool</div>
                  </div>
                </div>
                
                <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                  {event.title}
                </CardTitle>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date || `${event.start_date} - ${event.end_date}`}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location || event.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{event.participants || event.max_participants} {event.participants ? 'participants' : 'max participants'}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                <p className="text-muted-foreground mb-4 flex-1">
                  {event.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {(event.tags || []).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="hero"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleRegister(event.id)}
                  >
                    Register Now
                  </Button>
                  <Button variant="glass" size="sm">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Events Button */}
        <div className="text-center">
          <Button variant="glass" size="lg">
            View All Events
            <ExternalLink className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsShowcase;