import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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

// Update the component signature to accept the defined props
const ParticipantDashboard: React.FC<ParticipantDashboardProps> = ({ user, token }) => {
  const [selectedTab, setSelectedTab] = useState("events");

  // Sample data
  const registeredEvents = [
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

  const teamMembers = [
    { name: "John Doe", role: "Full Stack", email: "john@example.com" },
    { name: "Jane Smith", role: "UI/UX", email: "jane@example.com" },
  ];

  const certificates = [
    {
      id: 1,
      event: "AI Innovation Challenge",
      position: "Winner",
      date: "March 2024"
    }
  ];

  const renderEventsTab = () => (
    <div className="grid lg:grid-cols-2 gap-6">
      {registeredEvents.map((event) => (
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
                {event.date}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {event.type}
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
            {teamMembers.map((member, index) => (
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
              <Button variant="hero">
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
    <Card className="premium-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Project Submission
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>GitHub Repository</Label>
            <div className="relative">
              <Github className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="https://github.com/username/repo"
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Demo Video Link</Label>
            <div className="relative">
              <Video className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="https://youtube.com/watch?v=..."
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Live Demo URL</Label>
            <Input placeholder="https://your-project-demo.com" />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Project Description</Label>
          <Textarea
            placeholder="Describe your project, the problem it solves, and technologies used..."
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label>Documentation Upload</Label>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <FileText className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">
              Drop your documentation PDF here or click to browse
            </p>
            <Button variant="glass" size="sm">
              Choose File
            </Button>
          </div>
        </div>

        <Button variant="hero" size="lg" className="w-full">
          Submit Project
        </Button>
      </CardContent>
    </Card>
  );

  const renderCertificatesTab = () => (
    <div className="grid md:grid-cols-2 gap-6">
      {certificates.map((cert) => (
        <Card key={cert.id} className="premium-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              {cert.event}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-medium">{cert.position}</span>
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
