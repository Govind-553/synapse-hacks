import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Megaphone,
  MessageSquare,
  Send,
  Pin,
  Clock,
  User,
  Reply,
  Heart,
  Flag,
  Search,
  Filter
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Props definition
interface AnnouncementsPageProps {
  user: any;
  token: string | null;
}

const API_BASE_URL = "https://synapse-hacks-api.onrender.com/api";

const AnnouncementsPage: React.FC<AnnouncementsPageProps> = ({ user, token }) => {
  const [activeTab, setActiveTab] = useState("announcements");
  const [newQuestion, setNewQuestion] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [useStaticData, setUseStaticData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    message: "",
    priority: "low",
    eventId: 1, // Assuming a fixed event ID for now
  });

  // Sample static data
  const staticAnnouncements = [
    {
      id: 1,
      title: "Round 2 Judging Begins!",
      content: "The second round of judging starts in 30 minutes. Make sure your submissions are complete and all team members are present for the presentation phase.",
      author: "Event Organizer",
      timestamp: "2 hours ago",
      priority: "high",
      pinned: true,
      likes: 24,
      replies: 8
    },
    {
      id: 2,
      title: "Mentor Sessions Now Available",
      content: "Book 1-on-1 sessions with industry experts! Sessions are running until 8 PM today. Visit the mentor booth or book online through the event portal.",
      author: "Sarah Chen",
      timestamp: "4 hours ago",
      priority: "medium",
      pinned: false,
      likes: 15,
      replies: 3
    },
  ];

  const staticQuestions = [
    {
      id: 1,
      question: "Can we use external APIs in our project?",
      author: "Alex Kumar",
      timestamp: "1 hour ago",
      answered: true,
      answer: "Yes, you can use any publicly available APIs. Just make sure to document them in your README and ensure they're accessible during judging.",
      answeredBy: "Judge Panel",
      answerTime: "45 minutes ago",
      votes: 12,
      replies: 5
    },
    {
      id: 2,
      question: "What's the maximum team size allowed?",
      author: "Maria Santos",
      timestamp: "3 hours ago",
      answered: true,
      answer: "Teams can have a maximum of 4 members. All team members must be registered participants.",
      answeredBy: "Event Organizer",
      answerTime: "2 hours ago",
      votes: 8,
      replies: 1
    },
  ];

  useEffect(() => {
    if (useStaticData) {
      setAnnouncements(staticAnnouncements);
      setQuestions(staticQuestions);
      return;
    }

    const fetchAnnouncements = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/announcements/1`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (!response.ok) throw new Error("Failed to fetch announcements.");
        const data = await response.json();
        setAnnouncements(data);
      } catch (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };

    // Assuming a separate API for Q&A which doesn't exist yet, we'll keep static data for questions
    if (token) {
      fetchAnnouncements();
    }
  }, [token, useStaticData]);

  const handlePostQuestion = async () => {
    if (!newQuestion.trim()) {
      toast({ title: "Error", description: "Question cannot be empty.", variant: "destructive" });
      return;
    }
    
    // This is a placeholder as the API for questions is not yet defined in the backend files.
    // We'll simulate a success response for now.
    toast({ title: "Success", description: "Your question has been submitted." });
    setNewQuestion("");
  };

  const handlePostAnnouncement = async () => {
    if (!announcementForm.title.trim() || !announcementForm.message.trim()) {
      toast({ title: "Error", description: "Title and message are required.", variant: "destructive" });
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/announcements`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(announcementForm),
      });

      if (!response.ok) throw new Error("Failed to post announcement.");
      
      toast({ title: "Success", description: "Announcement posted successfully." });
      setAnnouncementForm({
        title: "",
        message: "",
        priority: "low",
        eventId: 1,
      });
      // Refresh the announcement list
      setUseStaticData(false); // Switch to live data to see the new announcement
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAnnouncements = announcements.filter(announcement =>
    announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    announcement.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedAnnouncements = useStaticData ? staticAnnouncements : filteredAnnouncements;
  const displayedQuestions = useStaticData ? staticQuestions : questions;

  const renderAnnouncements = () => (
    <div className="space-y-4">
      {/* Toggle Button */}
      <Button onClick={() => setUseStaticData(!useStaticData)} className="mb-4">
        {useStaticData ? "Switch to Live Data" : "Switch to Static Data"}
      </Button>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search announcements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="glass">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Announcements List */}
      {isLoading ? (
        <div>Loading announcements...</div>
      ) : (
        displayedAnnouncements.map((announcement) => (
          <Card
            key={announcement.id}
            className={`${announcement.pinned ? "premium-card border-primary/50" : "glass-card"}`}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  {announcement.pinned && <Pin className="w-4 h-4 text-primary" />}
                  <CardTitle className="text-lg">{announcement.title}</CardTitle>
                  <Badge
                    variant={
                      announcement.priority === "high" ? "destructive" :
                      announcement.priority === "medium" ? "default" : "secondary"
                    }
                  >
                    {announcement.priority}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-xs">
                    {announcement.author?.split(' ').map(n => n[0]).join('') || 'O'}
                  </AvatarFallback>
                </Avatar>
                <span>{announcement.author || 'Organizer'}</span>
                <span>•</span>
                <Clock className="w-3 h-3" />
                <span>{announcement.timestamp}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{announcement.content || announcement.message}</p>
              <div className="flex items-center gap-4 text-sm">
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Heart className="w-4 h-4 mr-1" />
                  {announcement.likes || 0}
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  {announcement.replies || 0}
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2 ml-auto">
                  <Flag className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );

  const renderQA = () => (
    <div className="space-y-6">
      <Button onClick={() => setUseStaticData(!useStaticData)} className="mb-4">
        {useStaticData ? "Switch to Live Data" : "Switch to Static Data"}
      </Button>
      {/* Ask Question Form */}
      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Ask a Question
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="What would you like to know? Be specific and clear..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            rows={3}
          />
          <div className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
              Questions are moderated and will be answered by organizers or judges
            </div>
            <Button
              variant="hero"
              disabled={newQuestion.trim().length === 0}
              onClick={handlePostQuestion}
            >
              <Send className="w-4 h-4 mr-2" />
              Ask Question
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Questions List */}
      <div className="space-y-4">
        {displayedQuestions.map((q) => (
          <Card key={q.id} className="glass-card">
            <CardContent className="p-6">
              {/* Question */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{q.question}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-xs">
                        {q.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span>{q.author}</span>
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    <span>{q.timestamp}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Heart className="w-4 h-4 mr-1" />
                    {q.votes}
                  </Button>
                  {q.answered && (
                    <Badge variant="default" className="ml-2">
                      Answered
                    </Badge>
                  )}
                </div>
              </div>

              {/* Answer (if available) */}
              {q.answered && (
                <div className="bg-muted/20 rounded-lg p-4 mb-4 border-l-4 border-primary">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-primary" />
                    <span className="font-medium text-primary">{q.answeredBy}</span>
                    <span className="text-xs text-muted-foreground">• {q.answerTime}</span>
                  </div>
                  <p className="text-sm">{q.answer}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Reply className="w-4 h-4 mr-1" />
                  Reply ({q.replies})
                </Button>
                <Button variant="ghost" size="sm">
                  <Flag className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="glass">
          Load More Questions
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-gradient">Event</span> Communication
          </h1>
          <p className="text-muted-foreground">
            Stay updated with announcements and get your questions answered
          </p>
          <p className="text-xs mt-2 text-gray-500">
            Logged in as: {user ? user.name : "Guest"} {token ? "(Authenticated)" : "(No Token)"}
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <Button
              variant={activeTab === "announcements" ? "hero" : "glass"}
              onClick={() => setActiveTab("announcements")}
              className="flex items-center gap-2"
            >
              <Megaphone className="w-4 h-4" />
              Announcements
            </Button>
            <Button
              variant={activeTab === "qa" ? "hero" : "glass"}
              onClick={() => setActiveTab("qa")}
              className="flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Q&A Forum
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl">
          {activeTab === "announcements" && renderAnnouncements()}
          {activeTab === "qa" && renderQA()}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsPage;