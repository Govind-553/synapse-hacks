import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Trophy,
  Crown,
  Medal,
  Award,
  TrendingUp,
  Users,
  Star,
  Search,
  Filter,
  Calendar,
  RefreshCw,
  Eye,
  ExternalLink,
  Github
} from "lucide-react";

// --- TypeScript Type Definitions ---
interface Event {
  id: string;
  name: string;
  status: "ongoing" | "completed";
}

interface Scores {
  innovation: number;
  functionality: number;
  design: number;
  scalability: number;
  presentation: number;
}

interface LeaderboardEntry {
  rank: number;
  teamName: string;
  projectName: string;
  members: string[];
  score: number;
  scores: Scores;
  trend: "up" | "down" | "same";
  avatar: string;
  githubUrl: string;
  demoUrl: string;
}

const LeaderboardPage = () => {
  const [selectedEvent, setSelectedEvent] = useState("current");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("score");
  const [lastUpdated, setLastUpdated] = useState("2 minutes ago");

  // Sample data
  const events: Event[] = [
    { id: "current", name: "AI Innovation Challenge", status: "ongoing" },
    { id: "web3", name: "Web3 Hackathon", status: "completed" },
    { id: "sustainability", name: "Sustainability Challenge", status: "completed" }
  ];

  const leaderboardData: LeaderboardEntry[] = [
    {
      rank: 1,
      teamName: "Code Warriors",
      projectName: "EcoTracker",
      members: ["Alice Chen", "Bob Smith", "Carol Davis", "Dan Wilson"],
      score: 94.5,
      scores: {
        innovation: 19,
        functionality: 18,
        design: 19,
        scalability: 18,
        presentation: 20
      },
      trend: "up",
      avatar: "https://placehold.co/100x100/A0E7E5/0E0D0D?text=CW",
      githubUrl: "https://github.com/code-warriors/ecotracker",
      demoUrl: "https://ecotracker-demo.com"
    },
    {
      rank: 2,
      teamName: "Tech Titans",
      projectName: "SmartCity IoT",
      members: ["Eva Rodriguez", "Frank Kim", "Grace Liu"],
      score: 92.3,
      scores: {
        innovation: 18,
        functionality: 19,
        design: 17,
        scalability: 19,
        presentation: 19
      },
      trend: "same",
      avatar: "https://placehold.co/100x100/FFB48F/0E0D0D?text=TT",
      githubUrl: "https://github.com/tech-titans/smartcity",
      demoUrl: "https://smartcity-demo.com"
    },
    {
      rank: 3,
      teamName: "Data Dynamos",
      projectName: "ML Analytics Platform",
      members: ["Henry Park", "Ivy Zhang", "Jack Thompson"],
      score: 89.7,
      scores: {
        innovation: 17,
        functionality: 18,
        design: 18,
        scalability: 17,
        presentation: 19
      },
      trend: "down",
      avatar: "https://placehold.co/100x100/B2D3C2/0E0D0D?text=DD",
      githubUrl: "https://github.com/data-dynamos/ml-platform",
      demoUrl: "https://ml-platform-demo.com"
    },
    {
      rank: 4,
      teamName: "Neural Networks",
      projectName: "Vision AI Assistant",
      members: ["Kelly Wang", "Liam Johnson"],
      score: 87.2,
      scores: {
        innovation: 18,
        functionality: 17,
        design: 16,
        scalability: 16,
        presentation: 20
      },
      trend: "up",
      avatar: "https://placehold.co/100x100/F4D03F/0E0D0D?text=NN",
      githubUrl: "https://github.com/neural-networks/vision-ai",
      demoUrl: "https://vision-ai-demo.com"
    },
    {
      rank: 5,
      teamName: "Team Alpha",
      projectName: "Smart Healthcare AI",
      members: ["Mike Brown", "Nina Scott", "Oscar Lee", "Pam White"],
      score: 85.8,
      scores: {
        innovation: 16,
        functionality: 17,
        design: 17,
        scalability: 17,
        presentation: 18
      },
      trend: "same",
      avatar: "https://placehold.co/100x100/C2C9D1/0E0D0D?text=TA",
      githubUrl: "https://github.com/team-alpha/healthcare-ai",
      demoUrl: "https://healthcare-ai-demo.com"
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return (
        <div className="w-8 h-8 flex items-center justify-center bg-muted rounded-full">
          <span className="text-sm font-bold">{rank}</span>
        </div>
      );
    }
  };

  const getTrendIcon = (trend: "up" | "down" | "same") => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down": return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  // Filter and sort data based on state changes
  const sortedData = useMemo(() => {
    const data = leaderboardData.filter(team =>
      team.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.projectName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortableData = [...data];

    if (sortBy === "score") {
      sortableData.sort((a, b) => b.score - a.score);
    } else {
      sortableData.sort((a, b) => {
        const scoreA = a.scores[sortBy as keyof Scores];
        const scoreB = b.scores[sortBy as keyof Scores];
        return scoreB - scoreA;
      });
    }

    return sortableData;
  }, [leaderboardData, searchQuery, sortBy]);

  const renderLeaderboardCard = (team: LeaderboardEntry) => (
    <Card
      key={team.rank}
      className={`relative p-4 rounded-lg transition-all ${
        team.rank <= 3 ? "bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20" : "glass-card"
      }`}
    >
      <div className="flex items-center gap-4">
        {getRankIcon(team.rank)}
        <Avatar className="w-12 h-12">
          <AvatarImage src={team.avatar} />
          <AvatarFallback>
            {team.teamName.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-bold">{team.teamName}</h3>
          <p className="text-sm text-muted-foreground">{team.projectName}</p>
        </div>
        <div className="text-right">
          <Badge variant="default" className="text-lg font-bold">
            {team.score.toFixed(1)}
          </Badge>
          <p className="text-xs text-muted-foreground mt-1">Total Score</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{team.members.join(', ')}</span>
        </div>
        <div className="flex items-center gap-2">
          <a href={team.githubUrl} target="_blank" rel="noopener noreferrer">
            <Github className="w-4 h-4 hover:text-primary transition-colors" />
          </a>
          <a href={team.demoUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4 hover:text-primary transition-colors" />
          </a>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-gradient">Live</span> Leaderboard
          </h1>
          <p className="text-muted-foreground">
            Real-time rankings and scores for all participants
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search teams or projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={selectedEvent} onValueChange={setSelectedEvent}>
            <SelectTrigger className="w-full lg:w-64">
              <SelectValue placeholder="Select event" />
            </SelectTrigger>
            <SelectContent>
              {events.map((event) => (
                <SelectItem key={event.id} value={event.id}>
                  <div className="flex items-center gap-2">
                    <span>{event.name}</span>
                    <Badge variant={event.status === "ongoing" ? "default" : "secondary"}>
                      {event.status}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="score">Total Score</SelectItem>
              <SelectItem value="innovation">Innovation</SelectItem>
              <SelectItem value="functionality">Functionality</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="scalability">Scalability</SelectItem>
              <SelectItem value="presentation">Presentation</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="glass">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Live Update Indicator */}
        <Card className="glass-card mb-8">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Live Updates</span>
                <span className="text-sm text-muted-foreground">Last updated: {lastUpdated}</span>
              </div>
              <div className="text-sm text-muted-foreground hidden md:block">
                {sortedData.length} teams • Auto-refresh every 30 seconds
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Desktop Leaderboard Table */}
        <div className="hidden lg:block">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedData.map((team) => (
                  <div
                    key={team.rank}
                    className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                      team.rank <= 3 ? "bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20" : "glass-card"
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex items-center gap-2">
                        {getRankIcon(team.rank)}
                        {getTrendIcon(team.trend)}
                      </div>
                      
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={team.avatar} />
                        <AvatarFallback>
                          {team.teamName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{team.teamName}</h3>
                        <p className="text-muted-foreground">{team.projectName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Users className="w-3 h-3" />
                          <span className="text-xs text-muted-foreground">
                            {team.members.join(', ')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      {/* Score Breakdown */}
                      <div className="hidden xl:flex items-center gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-medium">{team.scores.innovation}</div>
                          <div className="text-xs text-muted-foreground">Innovation</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">{team.scores.functionality}</div>
                          <div className="text-xs text-muted-foreground">Functionality</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">{team.scores.design}</div>
                          <div className="text-xs text-muted-foreground">Design</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">{team.scores.scalability}</div>
                          <div className="text-xs text-muted-foreground">Scalability</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">{team.scores.presentation}</div>
                          <div className="text-xs text-muted-foreground">Presentation</div>
                        </div>
                      </div>

                      {/* Total Score */}
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gradient">
                          {team.score.toFixed(1)}
                        </div>
                        <div className="text-sm text-muted-foreground">points</div>
                      </div>

                      {/* Links */}
                      <div className="flex flex-col gap-2">
                        <a href={team.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="glass" size="icon">
                            <Github className="w-5 h-5" />
                          </Button>
                        </a>
                        <a href={team.demoUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="glass" size="icon">
                            <ExternalLink className="w-5 h-5" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Leaderboard Cards */}
        <div className="lg:hidden">
          <div className="space-y-4">
            {sortedData.map(renderLeaderboardCard)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
