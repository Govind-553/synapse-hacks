import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Gavel,
  Trophy,
  Star,
  Calendar,
  Users,
  Eye,
  Github,
  Video,
  FileText,
  BarChart3,
  Crown,
  Medal,
  Award
} from "lucide-react";

// Define the structure for an assigned event
interface AssignedEvent {
  id: number;
  title: string;
  date: string;
  status: "ongoing" | "completed";
  submissions: number;
  reviewed: number;
  remaining: number;
}

// Define the structure for the scoring criteria
interface Scores {
  innovation: number;
  functionality: number;
  design: number;
  scalability: number;
  presentation: number;
}

// Define the structure for a project submission
interface Submission {
  id: number;
  teamName: string;
  projectTitle: string;
  description: string;
  githubUrl: string;
  demoUrl: string;
  videoUrl: string;
  status: "pending" | "reviewed";
  totalScore: number;
  scores: Scores;
}

// Define the structure for a leaderboard entry
interface LeaderboardEntry {
  rank: number;
  team: string;
  project: string;
  score: number;
}

// Define the structure for a navigation tab
interface Tab {
  id: "events" | "review" | "leaderboard";
  label: string;
  icon: any; // Using 'any' since lucide-react icons are components
}

// --- Main Component ---
const JudgeDashboard = () => {
  // Use a type union for selectedTab
  const [selectedTab, setSelectedTab] = useState<Tab["id"]>("events");
  // Use the Submission type for selectedSubmission, which can be null
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  // Sample data with defined types
  const assignedEvents: AssignedEvent[] = [
    {
      id: 1,
      title: "AI Innovation Challenge",
      date: "March 15-17, 2024",
      status: "ongoing",
      submissions: 24,
      reviewed: 18,
      remaining: 6
    },
    {
      id: 2,
      title: "Web3 Hackathon",
      date: "February 10-12, 2024",
      status: "completed",
      submissions: 42,
      reviewed: 42,
      remaining: 0
    }
  ];

  const submissions: Submission[] = [
    {
      id: 1,
      teamName: "Team Alpha",
      projectTitle: "Smart Healthcare AI",
      description: "An AI-powered diagnostic tool for early disease detection",
      githubUrl: "https://github.com/team-alpha/healthcare-ai",
      demoUrl: "https://healthcare-ai-demo.com",
      videoUrl: "https://youtube.com/watch?v=demo1",
      status: "pending",
      totalScore: 0,
      scores: {
        innovation: 0,
        functionality: 0,
        design: 0,
        scalability: 0,
        presentation: 0
      }
    },
    {
      id: 2,
      teamName: "Code Warriors",
      projectTitle: "EcoTracker",
      description: "Blockchain-based carbon footprint tracking system",
      githubUrl: "https://github.com/code-warriors/ecotracker",
      demoUrl: "https://ecotracker-demo.com",
      videoUrl: "https://youtube.com/watch?v=demo2",
      status: "reviewed",
      totalScore: 87,
      scores: {
        innovation: 18,
        functionality: 17,
        design: 16,
        scalability: 18,
        presentation: 18
      }
    }
  ];

  const leaderboard: LeaderboardEntry[] = [
    { rank: 1, team: "Code Warriors", project: "EcoTracker", score: 87 },
    { rank: 2, team: "Tech Titans", project: "SmartCity IoT", score: 85 },
    { rank: 3, team: "Data Dynamos", project: "ML Analytics", score: 82 },
    { rank: 4, team: "Team Alpha", project: "Healthcare AI", score: 78 },
    { rank: 5, team: "Neural Networks", project: "Vision AI", score: 76 }
  ];

  const renderEventsTab = () => (
    <div className="space-y-6">
      {assignedEvents.map((event) => (
        <Card key={event.id} className="premium-card">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <Badge
                    variant={event.status === "ongoing" ? "default" : "secondary"}
                    className="capitalize"
                  >
                    {event.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {event.date}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="glass-card p-4 text-center">
                <div className="text-2xl font-bold text-gradient">{event.submissions}</div>
                <div className="text-sm text-muted-foreground">Total Submissions</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="text-2xl font-bold text-green-500">{event.reviewed}</div>
                <div className="text-sm text-muted-foreground">Reviewed</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="text-2xl font-bold text-orange-500">{event.remaining}</div>
                <div className="text-sm text-muted-foreground">Remaining</div>
              </div>
            </div>

            {event.status === "ongoing" && event.remaining > 0 && (
              <div className="mb-4">
                <div className="w-full bg-muted/20 rounded-full h-2">
                  <div
                    className="bg-gradient-primary h-2 rounded-full"
                    style={{ width: `${(event.reviewed / event.submissions) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {Math.round((event.reviewed / event.submissions) * 100)}% completed
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="hero" size="sm" onClick={() => setSelectedTab("review")}>
                Review Submissions
              </Button>
              <Button variant="glass" size="sm" onClick={() => setSelectedTab("leaderboard")}>
                View Leaderboard
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderReviewTab = () => (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Submissions List */}
      <div className="lg:col-span-1">
        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="text-lg">Submissions to Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  onClick={() => setSelectedSubmission(submission)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedSubmission?.id === submission.id
                      ? "bg-gradient-primary text-primary-foreground"
                      : "glass-card hover:scale-105"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-sm">{submission.teamName}</h4>
                    <Badge
                      variant={submission.status === "reviewed" ? "default" : "outline"}
                      className="text-xs"
                    >
                      {submission.status}
                    </Badge>
                  </div>
                  <p className="text-xs opacity-80 truncate">{submission.projectTitle}</p>
                  {submission.status === "reviewed" && (
                    <div className="text-xs mt-1">Score: {submission.totalScore}/100</div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Review Panel */}
      <div className="lg:col-span-2">
        {selectedSubmission ? (
          <Card className="premium-card">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{selectedSubmission.projectTitle}</CardTitle>
                  <p className="text-muted-foreground">{selectedSubmission.teamName}</p>
                </div>
                <Badge variant={selectedSubmission.status === "reviewed" ? "default" : "outline"}>
                  {selectedSubmission.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Project Details */}
              <div>
                <h3 className="font-semibold mb-2">Project Description</h3>
                <p className="text-muted-foreground">{selectedSubmission.description}</p>
              </div>

              {/* Links */}
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="glass" className="justify-start" asChild>
                  <a href={selectedSubmission.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub Repo
                  </a>
                </Button>
                <Button variant="glass" className="justify-start" asChild>
                  <a href={selectedSubmission.demoUrl} target="_blank" rel="noopener noreferrer">
                    <Eye className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
                <Button variant="glass" className="justify-start" asChild>
                  <a href={selectedSubmission.videoUrl} target="_blank" rel="noopener noreferrer">
                    <Video className="w-4 h-4 mr-2" />
                    Demo Video
                  </a>
                </Button>
              </div>

              {/* Scoring Criteria */}
              <div>
                <h3 className="font-semibold mb-4">Evaluation Criteria</h3>
                <div className="space-y-4">
                  {Object.entries(selectedSubmission.scores).map(([criteria, score]) => (
                    <div key={criteria}>
                      <div className="flex justify-between items-center mb-2">
                        <Label className="capitalize">{criteria} (out of 20)</Label>
                        {/* Fix for Error 2: Ensure 'score' is treated as a number */}
                        <span className="text-sm font-medium">{score}/20</span>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(20)].map((_, index) => (
                          <button
                            key={index}
                            className={`w-4 h-4 rounded-sm transition-colors ${
                              index < score ? "bg-yellow-400" : "bg-muted/30"
                            }`}
                            onClick={() => {
                              const newScore = index + 1;
                              setSelectedSubmission(prev => {
                                if (!prev) return null;

                                const updatedScores = {
                                  ...prev.scores,
                                  [criteria]: newScore
                                };

                                // Fix for Error 3: Ensure reduce operates on numbers
                                const newTotalScore = Object.values(updatedScores).reduce((a: number, b: number) => a + b, 0);

                                return {
                                  ...prev,
                                  scores: updatedScores,
                                  totalScore: newTotalScore
                                };
                              });
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comments */}
              <div>
                <Label>Additional Comments</Label>
                <Textarea
                  placeholder="Provide feedback and suggestions for improvement..."
                  rows={3}
                  className="mt-1"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="hero" className="flex-1">
                  Submit Review
                </Button>
                <Button variant="glass">
                  Save Draft
                </Button>
              </div>

              {/* Total Score Display */}
              <div className="glass-card p-4 text-center">
                <div className="text-2xl font-bold text-gradient mb-1">
                  {selectedSubmission.totalScore}/100
                </div>
                <div className="text-sm text-muted-foreground">Total Score</div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="premium-card">
            <CardContent className="p-12 text-center">
              <Gavel className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Select a Submission</h3>
              <p className="text-muted-foreground">
                Choose a submission from the left panel to start reviewing
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );

  const renderLeaderboardTab = () => (
    <Card className="premium-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Real-time Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboard.map((entry) => {
            const getRankIcon = (rank: number) => {
              switch (rank) {
                case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
                case 2: return <Medal className="w-5 h-5 text-gray-400" />;
                case 3: return <Award className="w-5 h-5 text-amber-600" />;
                default: return <div className="w-5 h-5 flex items-center justify-center text-sm font-bold">{rank}</div>;
              }
            };

            return (
              <div
                key={entry.rank}
                className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                  entry.rank <= 3 ? "premium-card" : "glass-card"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10">
                    {getRankIcon(entry.rank)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{entry.team}</h4>
                    <p className="text-sm text-muted-foreground">{entry.project}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-gradient">{entry.score}</div>
                  <div className="text-sm text-muted-foreground">points</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 glass-card p-4 text-center">
          <p className="text-sm text-muted-foreground">
            Leaderboard updates in real-time as reviews are submitted
          </p>
        </div>
      </CardContent>
    </Card>
  );

  const tabs: Tab[] = [
    { id: "events", label: "Assigned Events", icon: Calendar },
    { id: "review", label: "Review Submissions", icon: Gavel },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-gradient">Judge</span> Dashboard
          </h1>
          <p className="text-muted-foreground">
            Review submissions, evaluate projects, and maintain fair competition
          </p>
        </div>

        {/* Mobile Tabs */}
        <div className="mb-8 md:hidden">
          <div className="grid grid-cols-3 gap-2">
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
                  <span className="hidden sm:inline">{tab.label}</span>
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
            {selectedTab === "review" && renderReviewTab()}
            {selectedTab === "leaderboard" && renderLeaderboardTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgeDashboard;
