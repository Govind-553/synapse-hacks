import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Download,
  Trophy,
  Star,
  Calendar,
  Award,
  Crown,
  Medal,
  Eye,
  Share2,
  Search,
  Filter,
  ExternalLink
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Add an interface to define the props
interface CertificatesPageProps {
  user: any;
  token: string | null;
}

const API_BASE_URL = "https://synapse-hacks-api.onrender.com/api";

// Update the component to accept the props
const CertificatesPage: React.FC<CertificatesPageProps> = ({ user, token }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [useStaticData, setUseStaticData] = useState(true);

  // Sample certificates data
  const staticCertificates = [
    {
      id: 1,
      eventName: "AI Innovation Challenge",
      eventDate: "March 15-17, 2024",
      achievement: "Winner",
      position: 1,
      teamName: "Code Warriors",
      category: "AI/ML",
      prize: "$25,000",
      status: "available",
      downloadUrl: "/certificates/ai-challenge-winner.pdf",
      verificationId: "SH2024-AI-001-W",
      description: "First place winner in the AI Innovation Challenge 2024",
      participantCount: 127,
      icon: "crown"
    },
    {
      id: 2,
      eventName: "Web3 Hackathon",
      eventDate: "February 10-12, 2024",
      achievement: "Runner-up",
      position: 2,
      teamName: "Blockchain Builders",
      category: "Web3",
      prize: "$15,000",
      status: "available",
      downloadUrl: "/certificates/web3-hackathon-runner-up.pdf",
      verificationId: "SH2024-WEB3-002-RU",
      description: "Second place in the Web3 Hackathon 2024",
      participantCount: 89,
      icon: "medal"
    },
    {
      id: 3,
      eventName: "Sustainability Challenge",
      eventDate: "January 20-22, 2024",
      achievement: "Participation",
      position: null,
      teamName: "Green Innovators",
      category: "Sustainability",
      prize: null,
      status: "available",
      downloadUrl: "/certificates/sustainability-participation.pdf",
      verificationId: "SH2024-SUST-003-P",
      description: "Participation certificate for Sustainability Challenge 2024",
      participantCount: 156,
      icon: "award"
    },
    {
      id: 4,
      eventName: "Future Tech Summit",
      eventDate: "April 5-7, 2024",
      achievement: "Third Place",
      position: 3,
      teamName: "Tech Innovators",
      category: "General",
      prize: "$5,000",
      status: "processing",
      downloadUrl: null,
      verificationId: "SH2024-TECH-004-3RD",
      description: "Third place in the Future Tech Summit 2024",
      participantCount: 203,
      icon: "trophy"
    }
  ];

  useEffect(() => {
    if (useStaticData) {
      setCertificates(staticCertificates);
      return;
    }

    const fetchCertificates = async () => {
      if (!user || !token) return;

      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/certificates/${user.id}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch certificates.");
        }

        const data = await response.json();
        setCertificates(data);
      } catch (error) {
        toast({
          title: "Error fetching certificates",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertificates();
  }, [user, token, useStaticData]);

  const getAchievementIcon = (icon, position) => {
    switch (icon) {
      case "crown":
        return <Crown className="w-8 h-8 text-yellow-500" />;
      case "medal":
        return <Medal className="w-8 h-8 text-gray-400" />;
      case "trophy":
        return <Award className="w-8 h-8 text-amber-600" />;
      default:
        return <Trophy className="w-8 h-8 text-primary" />;
    }
  };

  const getAchievementColor = (achievement) => {
    switch (achievement?.toLowerCase()) {
      case "winner":
        return "bg-gradient-to-r from-yellow-400 to-yellow-600";
      case "runner-up":
        return "bg-gradient-to-r from-gray-300 to-gray-500";
      case "third place":
        return "bg-gradient-to-r from-amber-400 to-amber-600";
      default:
        return "bg-gradient-primary";
    }
  };

  const displayedCertificates = useStaticData ? staticCertificates : certificates;

  const filteredCertificates = displayedCertificates.filter(cert =>
    cert.eventName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.achievement?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const CertificatePreview = ({ certificate }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedCertificate(null)}>
      <Card className="max-w-2xl w-full premium-card" onClick={(e) => e.stopPropagation()}>
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
            {getAchievementIcon(certificate.icon, certificate.position)}
          </div>
          <CardTitle className="text-2xl text-gradient">Certificate of {certificate.achievement}</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="glass-card p-6 space-y-3">
            <h3 className="text-xl font-bold">{certificate.eventName}</h3>
            <p className="text-muted-foreground">Presented to</p>
            <h2 className="text-2xl font-bold text-gradient">{certificate.teamName}</h2>
            <p className="text-muted-foreground">for achieving {certificate.achievement}</p>
            {certificate.position && (
              <div className="text-lg font-semibold">Position: #{certificate.position}</div>
            )}
            <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {certificate.eventDate}
              </div>
              <div>•</div>
              <div>{certificate.participantCount} participants</div>
            </div>
            {certificate.prize && (
              <div className="text-lg font-semibold text-green-500">Prize: {certificate.prize}</div>
            )}
          </div>
          
          <div className="text-xs text-muted-foreground">
            Verification ID: {certificate.verificationId}
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button variant="hero" className="flex-1" disabled={certificate.status !== "available"} asChild>
              <a href={`${API_BASE_URL}/certificates/${certificate.id}/download`} target="_blank">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </a>
            </Button>
            <Button variant="glass">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="glass" onClick={() => setSelectedCertificate(null)}>
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-gradient">My</span> Certificates
          </h1>
          <p className="text-muted-foreground">
            Download and share your hackathon achievements and certifications
          </p>
          <Button onClick={() => setUseStaticData(!useStaticData)} className="mt-4">
            {useStaticData ? "Switch to Live Data" : "Switch to Static Data"}
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-gradient">{filteredCertificates.length}</div>
              <div className="text-sm text-muted-foreground">Total Certificates</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <Crown className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold text-gradient">
                {filteredCertificates.filter(c => c.achievement === "Winner").length}
              </div>
              <div className="text-sm text-muted-foreground">Wins</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <Medal className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <div className="text-2xl font-bold text-gradient">
                {filteredCertificates.filter(c => c.position && c.position <= 3).length}
              </div>
              <div className="text-sm text-muted-foreground">Top 3 Finishes</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-bold text-gradient">
                {filteredCertificates.filter(c => c.status === "available").length}
              </div>
              <div className="text-sm text-muted-foreground">Available</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search certificates..."
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

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.length > 0 ? (
            filteredCertificates.map((certificate) => (
              <Card
                key={certificate.id}
                className={`premium-card cursor-pointer transition-all duration-300 hover:scale-105 ${
                  certificate.status === "processing" ? "opacity-75" : ""
                }`}
                onClick={() => certificate.status === "available" && setSelectedCertificate(certificate)}
              >
                <CardHeader className="text-center pb-2">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full ${getAchievementColor(certificate.achievement)} flex items-center justify-center`}>
                    {getAchievementIcon(certificate.icon, certificate.position)}
                  </div>
                  <CardTitle className="text-lg">{certificate.eventName}</CardTitle>
                  <div className="flex items-center justify-center gap-2">
                    <Badge variant={certificate.status === "available" ? "default" : "secondary"}>
                      {certificate.achievement}
                    </Badge>
                    <Badge variant="outline">
                      {certificate.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Team: {certificate.teamName}</div>
                    <div className="text-sm text-muted-foreground">{certificate.eventDate}</div>
                    {certificate.position && (
                      <div className="text-sm font-semibold">Position: #{certificate.position}</div>
                    )}
                    {certificate.prize && (
                      <div className="text-sm font-semibold text-green-500">{certificate.prize}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    {certificate.status === "available" ? (
                      <>
                        <Button variant="hero" size="sm" className="w-full">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview & Download
                        </Button>
                        <div className="flex gap-2">
                          <Button variant="glass" size="sm" className="flex-1">
                            <Share2 className="w-4 h-4 mr-1" />
                            Share
                          </Button>
                          <Button variant="glass" size="sm" className="flex-1">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Verify
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-2">
                        <div className="text-sm text-orange-500 font-medium">Processing...</div>
                        <div className="text-xs text-muted-foreground">
                          Certificate will be available within 24-48 hours after event completion
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-muted-foreground pt-2 border-t border-border">
                    ID: {certificate.verificationId}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="glass-card col-span-3">
              <CardContent className="p-12 text-center">
                <Trophy className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No Certificates Found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery
                    ? "No certificates match your search criteria"
                    : "Participate in hackathons to earn certificates and showcase your achievements"
                  }
                </p>
                {!searchQuery && (
                  <Button variant="hero">
                    Explore Events
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Certificate Verification Info */}
        <Card className="glass-card mt-8">
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">Certificate Verification</h4>
            <p className="text-sm text-muted-foreground">
              All certificates are digitally signed and can be verified using the unique verification ID.
              Employers and institutions can validate your achievements through our verification portal.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Certificate Preview Modal */}
      {selectedCertificate && <CertificatePreview certificate={selectedCertificate} />}
    </div>
  );
};

export default CertificatesPage;