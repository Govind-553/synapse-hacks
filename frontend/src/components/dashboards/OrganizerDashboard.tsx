import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Calendar, 
  Users, 
  Settings, 
  Megaphone, 
  BarChart3, 
  Trophy,
  DollarSign,
  Edit,
  Eye,
  Trash2,
  Send
} from "lucide-react";

const OrganizerDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("create");

  // Sample data
  const myEvents = [
    {
      id: 1,
      title: "AI Innovation Challenge",
      date: "March 15-17, 2024",
      status: "upcoming",
      participants: 127,
      submissions: 0,
      prize: "$25,000"
    },
    {
      id: 2,
      title: "Web3 Hackathon",
      date: "February 10-12, 2024",
      status: "completed",
      participants: 89,
      submissions: 42,
      prize: "$15,000"
    }
  ];

  const renderCreateEventTab = () => (
    <Card className="premium-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create New Event
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Event Title</Label>
            <Input placeholder="Enter event title" />
          </div>
          <div className="space-y-2">
            <Label>Event Theme</Label>
            <Input placeholder="e.g., AI/ML, Web3, Sustainability" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Start Date</Label>
            <Input type="date" />
          </div>
          <div className="space-y-2">
            <Label>End Date</Label>
            <Input type="date" />
          </div>
          <div className="space-y-2">
            <Label>Event Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Location (if offline/hybrid)</Label>
          <Input placeholder="Enter venue address" />
        </div>

        <div className="space-y-2">
          <Label>Event Description</Label>
          <Textarea 
            placeholder="Describe your hackathon, rules, and expectations..."
            rows={4}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Prize Pool</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="25000" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Max Participants</Label>
            <Input type="number" placeholder="500" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Sponsors</Label>
          <Input placeholder="Sponsor names (comma-separated)" />
        </div>

        <div className="space-y-2">
          <Label>Rules & Guidelines</Label>
          <Textarea 
            placeholder="Define rules, submission criteria, and judging parameters..."
            rows={4}
          />
        </div>

        <div className="flex gap-4">
          <Button variant="hero" className="flex-1">
            Create Event
          </Button>
          <Button variant="glass">
            Save as Draft
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderManageEventsTab = () => (
    <div className="space-y-6">
      {myEvents.map((event) => (
        <Card key={event.id} className="premium-card">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <Badge 
                    variant={event.status === "upcoming" ? "default" : "secondary"}
                    className="capitalize"
                  >
                    {event.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {event.participants} participants
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    {event.prize}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="glass" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="glass" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="glass" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div className="glass-card p-4 text-center">
                <div className="text-2xl font-bold text-gradient">{event.participants}</div>
                <div className="text-sm text-muted-foreground">Registered</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="text-2xl font-bold text-gradient">{event.submissions}</div>
                <div className="text-sm text-muted-foreground">Submissions</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="text-2xl font-bold text-gradient">12</div>
                <div className="text-sm text-muted-foreground">Teams</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="text-2xl font-bold text-gradient">5</div>
                <div className="text-sm text-muted-foreground">Judges</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="hero" size="sm">
                View Details
              </Button>
              <Button variant="glass" size="sm">
                Manage Participants
              </Button>
              <Button variant="glass" size="sm">
                Send Announcement
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderAnnouncementsTab = () => (
    <div className="space-y-6">
      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="w-5 h-5" />
            Send Announcement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Select Event</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose event" />
              </SelectTrigger>
              <SelectContent>
                {myEvents.filter(e => e.status === "upcoming").map(event => (
                  <SelectItem key={event.id} value={event.id.toString()}>
                    {event.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Announcement Title</Label>
            <Input placeholder="Enter announcement title" />
          </div>
          <div className="space-y-2">
            <Label>Message</Label>
            <Textarea 
              placeholder="Type your announcement message..."
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label>Priority</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="hero" className="w-full">
            <Send className="w-4 h-4 mr-2" />
            Send Announcement
          </Button>
        </CardContent>
      </Card>

      <Card className="premium-card">
        <CardHeader>
          <CardTitle>Recent Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="glass-card p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">Round 2 Begins!</h4>
                <Badge variant="default">High</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                The second round of judging starts in 30 minutes. Make sure your submissions are ready!
              </p>
              <div className="text-xs text-muted-foreground">
                Sent 2 hours ago • AI Innovation Challenge
              </div>
            </div>
            <div className="glass-card p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">Mentor Sessions Available</h4>
                <Badge variant="secondary">Medium</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Book 1-on-1 sessions with industry experts to get feedback on your projects.
              </p>
              <div className="text-xs text-muted-foreground">
                Sent yesterday • AI Innovation Challenge
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold text-gradient">1,247</div>
            <div className="text-sm text-muted-foreground">Total Participants</div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-6 text-center">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold text-gradient">15</div>
            <div className="text-sm text-muted-foreground">Events Hosted</div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-6 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold text-gradient">89%</div>
            <div className="text-sm text-muted-foreground">Completion Rate</div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-6 text-center">
            <DollarSign className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold text-gradient">$125K</div>
            <div className="text-sm text-muted-foreground">Total Prizes</div>
          </CardContent>
        </Card>
      </div>

      <Card className="premium-card">
        <CardHeader>
          <CardTitle>Event Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myEvents.map((event) => (
              <div key={event.id} className="glass-card p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">{event.title}</h4>
                  <Badge variant={event.status === "completed" ? "default" : "secondary"}>
                    {event.status}
                  </Badge>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Participants:</span>
                    <span className="ml-2 font-medium">{event.participants}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Submissions:</span>
                    <span className="ml-2 font-medium">{event.submissions}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Prize Pool:</span>
                    <span className="ml-2 font-medium">{event.prize}</span>
                  </div>
                </div>
                {event.status === "completed" && (
                  <div className="mt-2">
                    <div className="w-full bg-muted/20 rounded-full h-2">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full" 
                        style={{ width: `${(event.submissions / event.participants) * 100}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {Math.round((event.submissions / event.participants) * 100)}% submission rate
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const tabs = [
    { id: "create", label: "Create Event", icon: Plus },
    { id: "manage", label: "Manage Events", icon: Settings },
    { id: "announcements", label: "Announcements", icon: Megaphone },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-gradient">Organizer</span> Dashboard
          </h1>
          <p className="text-muted-foreground">
            Create and manage hackathon events, track analytics, and engage with participants
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
            {selectedTab === "create" && renderCreateEventTab()}
            {selectedTab === "manage" && renderManageEventsTab()}
            {selectedTab === "announcements" && renderAnnouncementsTab()}
            {selectedTab === "analytics" && renderAnalyticsTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;