import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { 
  Calendar, 
  Users, 
  Upload, 
  Download, 
  Trophy, 
  Clock, 
  MapPin,
  Github,
  Video,
  FileText,
  Plus,
  Mail,
  Star
} from "lucide-react";

// Add an interface to define the props that the component expects
interface ParticipantDashboardProps {
  user: any;
  token: string | null;
}

const API_BASE_URL = "https://synapse-hacks-api.onrender.com/api";

// Update the component signature to accept the defined props
const ParticipantDashboard: React.FC<ParticipantDashboardProps> = ({ user, token }) => {
  const [selectedTab, setSelectedTab] = useState("events");
  const [useStaticData, setUseStaticData] = useState(true);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loadingState, setLoadingState] = useState({
    events: false,
    teams: false,
    certs: false,
  });

  // Sample data to keep as requested
  const staticRegisteredEvents = [
    {
      id: 1,
      title: "AI Innovation Challenge",
      date: "March 15-17, 2024",
      status: "upcoming",
      type: "Online",
      team: "Team Alpha",
      submissionStatus: "pending"
    },
    {
      id: 2,
      title: "Blockchain Summit Hack",
      date: "April 22-24, 2024", 
      status: "ongoing",
      type: "San Francisco, CA",
      team: "Code Warriors",
      submissionStatus: "submitted"
    }
  ];

  const staticTeamMembers = [
    { name: "John Doe", role: "Full Stack", email: "john@example.com" },
    { name: "Jane Smith", role: "UI/UX", email: "jane@example.com" },
  ];

  const staticCertificates = [
    {
      id: 1,
      event: "AI Innovation Challenge",
      position: "Winner",
      date: "March 2024"
    }
  ];

  // Fetch data from backend on mount or when static data toggle changes
  useEffect(() => {
    if (useStaticData) {
      setRegisteredEvents(staticRegisteredEvents);
      setTeamMembers(staticTeamMembers);
      setCertificates(staticCertificates);
      return;
    }

    const fetchEvents = async () => {
      setLoadingState(prev => ({ ...prev, events: true }));
      try {
        const response = await fetch(`${API_BASE_URL}/events`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (!response.ok) throw new Error("Failed to fetch events.");
        const data = await response.json();
        // Here you would filter by registered user. Mocking registration for now.
        setRegisteredEvents(data);
      } catch (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } finally {
        setLoadingState(prev => ({ ...prev, events: false }));
      }
    };

    const fetchTeams = async () => {
      setLoadingState(prev => ({ ...prev, teams: true }));
      if (!registeredEvents.length) return;
      try {
        // This is a simplified approach. In a real app, you would fetch the user's team directly.
        const response = await fetch(`${API_BASE_URL}/teams/${registeredEvents[0].id}/teams`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (!response.ok) throw new Error("Failed to fetch team members.");
        const data = await response.json();
        // Assuming we get a list of members back
        setTeamMembers(data.map(member => ({ name: member.name, email: member.email, role: member.role })));
      } catch (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } finally {
        setLoadingState(prev => ({ ...prev, teams: false }));
      }
    };
    
    const fetchCertificates = async () => {
      setLoadingState(prev => ({ ...prev, certs: true }));
      try {
        const response = await fetch(`${API_BASE_URL}/certificates/${user.id}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (!response.ok) throw new Error("Failed to fetch certificates.");
        const data = await response.json();
        setCertificates(data);
      } catch (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } finally {
        setLoadingState(prev => ({ ...prev, certs: false }));
      }
    };

    if (user && token) {
      fetchEvents();
      fetchTeams();
      fetchCertificates();
    }
  }, [user, token, useStaticData]);

  const handleRegister = async (eventId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/${eventId}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ userId: user.id }),
      });
      if (!response.ok) throw new Error("Failed to register.");
      toast({ title: "Success", description: "Registered successfully!" });
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleInvite = async (teamId, email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/teams/${teamId}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ userId: email }), // Assuming backend can find user by email
      });
      if (!response.ok) throw new Error("Failed to send invitation.");
      toast({ title: "Success", description: "Invitation sent!" });
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const renderEventsTab = () => (
    <div className="grid lg:grid-cols-2 gap-6">
      {loadingState.events ? <div>Loading events...</div> : registeredEvents.map((event) => (
        <Card key={event.id} className="premium-card">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start mb-2">
              <Badge 
                variant={event.status === "ongoing" ? "default" : "secondary"}
                className="capitalize"
              >
                {event.status}
              </Badge>
              <Badge 
                variant={event.submissionStatus === "submitted" ? "default" : "outline"}
              >
                {event.submissionStatus === "submitted" ? "Submitted" : "Pending"}
              </Badge>
            </div>
            <CardTitle className="text-xl">{event.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {event.date || `${event.start_date} - ${event.end_date}`}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {event.type || event.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                {event.team}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="hero" size="sm" className="flex-1">
                View Details
              </Button>
              <Button variant="glass" size="sm">
                <Upload className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderTeamTab = () => (
    <div className="space-y-6">
      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Current Team: Team Alpha
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loadingState.teams ? <div>Loading team members...</div> : teamMembers.map((member, index) => (
              <div key={index} className="flex items-center justify-between p-3 glass-card rounded-lg">
                <div>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-sm text-muted-foreground">{member.role}</div>
                </div>
                <div className="text-sm text-muted-foreground">{member.email}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="premium-card">
        <CardHeader>
          <CardTitle>Invite Team Member</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="invite-email">Email Address</Label>
            <div className="flex gap-2 mt-1">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="Enter teammate's email"
                  className="pl-10"
                />
              </div>
              <Button variant="hero" onClick={() => handleInvite(1, 'teammate@example.com')}>
                <Plus className="w-4 h-4 mr-2" />
                Invite
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSubmissionsTab = () => (
    // This part is handled by ProjectSubmission.tsx
    <div>Submissions form will be here</div>
  );

  const renderCertificatesTab = () => (
    <div className="grid md:grid-cols-2 gap-6">
      {loadingState.certs ? <div>Loading certificates...</div> : certificates.map((cert) => (
        <Card key={cert.id} className="premium-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              {cert.eventName || cert.event}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-medium">{cert.achievement || cert.position}</span>
              </div>
              <div className="text-sm text-muted-foreground">{cert.date}</div>
            </div>
            <Button variant="hero" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download Certificate
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const tabs = [
    { id: "events", label: "My Events", icon: Calendar },
    { id: "team", label: "My Team", icon: Users },
    { id: "submissions", label: "Submissions", icon: Upload },
    { id: "certificates", label: "Certificates", icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-gradient">Participant</span> Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your hackathon participation, teams, and submissions
          </p>
          <Button onClick={() => setUseStaticData(!useStaticData)} className="mt-4">
            {useStaticData ? "Switch to Live Data" : "Switch to Static Data"}
          </Button>
        </div>

        {/* Mobile Tabs */}
        <div className="mb-8 md:hidden">
          <div className="grid grid-cols-2 gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={selectedTab === tab.id ? "hero" : "glass"}
                  size="sm"
                  onClick={() => setSelectedTab(tab.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden md:block">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      selectedTab === tab.id
                        ? "bg-gradient-primary text-primary-foreground"
                        : "glass-card hover:scale-105"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedTab === "events" && renderEventsTab()}
            {selectedTab === "team" && renderTeamTab()}
            {selectedTab === "submissions" && renderSubmissionsTab()}
            {selectedTab === "certificates" && renderCertificatesTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantDashboard;