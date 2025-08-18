import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge"; // Added this line
import { Users, Lightbulb, ExternalLink, Globe } from "lucide-react";

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Jane Doe",
      role: "CEO & Founder",
      bio: "Visionary leader passionate about fostering innovation in the tech community.",
      avatar: "https://placehold.co/100x100/6A5ACD/ffffff?text=JD",
    },
    {
      name: "John Smith",
      role: "Head of Engineering",
      bio: "Software architect with a knack for building scalable and robust platforms.",
      avatar: "https://placehold.co/100x100/FF6347/ffffff?text=JS",
    },
    {
      name: "Emily White",
      role: "Community Manager",
      bio: "Connects developers and builds a vibrant, collaborative ecosystem.",
      avatar: "https://placehold.co/100x100/3CB371/ffffff?text=EW",
    },
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">About</span> SynapseHacks
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            SynapseHacks is more than just a platform; it's a movement. We empower 
            developers, designers, and creators to turn bold ideas into reality.
          </p>
        </div>

        {/* Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
          <div className="space-y-6">
            <Badge variant="secondary">Our Mission</Badge>
            <h2 className="text-4xl font-bold">
              Connecting Minds, Building Futures.
            </h2>
            <p className="text-muted-foreground text-lg">
              Our mission is to create a vibrant, inclusive, and transparent ecosystem 
              for hackathons worldwide. We believe in the power of collaboration and 
              healthy competition to drive technological progress and innovation.
            </p>
            <Button variant="hero" asChild>
              <a href="/events">
                Explore Events
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
          <div className="relative glass-card p-6 rounded-3xl">
            <div className="w-full h-80 bg-gray-700 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
              {/* Replace with a relevant image or illustration */}
              <Lightbulb className="w-16 h-16 text-primary animate-pulse" />
            </div>
          </div>
        </div>

        {/* Meet the Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet the <span className="text-gradient">Team</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We are a small but dedicated team passionate about hackathons. Our goal 
            is to provide the best possible experience for everyone involved.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="premium-card text-center group">
              <CardContent className="p-6">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-primary/50 group-hover:scale-110 transition-transform">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl font-semibold mb-1">
                  {member.name}
                </CardTitle>
                <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm">
                  {member.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="glass-card p-12 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to <span className="text-gradient">Join the Community?</span>
            </h3>
            <p className="text-muted-foreground mb-6">
              Whether you're a participant, an organizer, or a judge, there's a place 
              for you at SynapseHacks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <a href="/register">
                  <Users className="w-5 h-5 mr-2" />
                  Become a Member
                </a>
              </Button>
              <Button variant="glass" size="lg" asChild>
                <a href="/host">
                  <Globe className="w-5 h-5 mr-2" />
                  Host an Event
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
