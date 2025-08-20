import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Upload,
  Github,
  Video,
  FileText,
  Link,
  Image,
  Check,
  AlertCircle,
  Calendar,
  Clock,
  Users,
  Trophy
} from "lucide-react";

interface ProjectSubmissionProps {
  user: any;
  token: string | null;
}

const ProjectSubmission: React.FC<ProjectSubmissionProps> = ({ user, token }) => {
  const [submissionData, setSubmissionData] = useState({
    projectTitle: "",
    description: "",
    githubRepo: "",
    demoVideo: "",
    liveDemo: "",
    category: "",
    technologies: "",
    teamMembers: "",
    documentation: null
  });

  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Sample event data
  const eventInfo = {
    title: "AI Innovation Challenge",
    deadline: "March 17, 2024 - 11:59 PM",
    timeRemaining: "2 days, 14 hours",
    teamName: "Team Alpha",
    maxFileSize: "10MB",
    allowedFormats: "PDF, DOC, DOCX"
  };

  const handleInputChange = (field: string, value: any) => {
    setSubmissionData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploadedFile(file);
      handleInputChange("documentation", file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      handleInputChange("documentation", file);
    }
  };

  const isFormValid = () => {
    const required = ['projectTitle', 'description', 'githubRepo'];
    return required.every(field => (submissionData as any)[field]?.trim() !== '');
  };

  const categories = [
    "AI/Machine Learning",
    "Web Development",
    "Mobile App",
    "Blockchain/Web3",
    "IoT/Hardware",
    "Data Science",
    "Cybersecurity",
    "Gaming",
    "Fintech",
    "Healthcare",
    "Education",
    "Sustainability"
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-gradient">Project</span> Submission
          </h1>
          <p className="text-muted-foreground">
            Submit your innovative solution and compete for amazing prizes
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Event Info Sidebar */}
          <div className="lg:col-span-1">
            <Card className="premium-card sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">{eventInfo.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="glass-card p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium">Time Remaining</span>
                  </div>
                  <div className="text-lg font-bold text-gradient">{eventInfo.timeRemaining}</div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Deadline: {eventInfo.deadline}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Team: {eventInfo.teamName}</span>
                  </div>
                </div>

                <div className="glass-card p-3">
                  <h4 className="font-medium mb-2">Submission Requirements</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• GitHub repository link</li>
                    <li>• Project description</li>
                    <li>• Demo video (optional)</li>
                    <li>• Documentation (optional)</li>
                    <li>• Live demo link (optional)</li>
                  </ul>
                </div>

                <Button variant="glass" className="w-full" asChild>
                  <a href="/rules" target="_blank">
                    <FileText className="w-4 h-4 mr-2" />
                    View Rules
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Team Members */}
            <Card className="premium-card mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Team Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="team-members">Team Member Details</Label>
                  <Textarea
                    id="team-members"
                    placeholder="List all team members with their roles (e.g., John Doe - Frontend Developer, Jane Smith - UI/UX Designer)"
                    rows={3}
                    value={submissionData.teamMembers}
                    onChange={(e) => handleInputChange("teamMembers", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Validation Summary */}
            <Card className="glass-card mt-8">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {isFormValid() ? (
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">
                      {isFormValid() ? "Ready to Submit" : "Required Fields Missing"}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {isFormValid()
                        ? "All required fields are completed. You can now submit your project."
                        : "Please fill in all required fields marked with * before submitting."
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                variant="hero"
                size="lg"
                className="flex-1"
                disabled={!isFormValid()}
                onClick={() => {
                  // Handle submission logic here
                  console.log("Submitting project:", submissionData);
                }}
              >
                <Upload className="w-5 h-5 mr-2" />
                Submit Project
              </Button>
              <Button
                variant="glass"
                size="lg"
                onClick={() => {
                  // Handle save as draft logic here
                  console.log("Saving draft:", submissionData);
                }}
              >
                Save as Draft
              </Button>
            </div>

            {/* Submission Guidelines */}
            <Card className="glass-card mt-8">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Submission Guidelines</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Ensure your GitHub repository is public and contains a clear README</li>
                  <li>• Test your live demo link before submitting</li>
                  <li>• Video demos should be 3-5 minutes long and showcase key features</li>
                  <li>• Documentation should include setup instructions and API details</li>
                  <li>• Late submissions will not be accepted after the deadline</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Main Submission Form */}
          <div className="lg:col-span-3">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              {/* Basic Information */}
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Project Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter your project title"
                      value={submissionData.projectTitle}
                      onChange={(e) => handleInputChange("projectTitle", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select
                        value={submissionData.category}
                        onValueChange={(value) => handleInputChange("category", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Technologies Used</Label>
                      <Input
                        placeholder="e.g., React, Node.js, Python, TensorFlow"
                        value={submissionData.technologies}
                        onChange={(e) => handleInputChange("technologies", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your project, the problem it solves, and how it works..."
                      rows={5}
                      value={submissionData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      required
                    />
                    <div className="text-xs text-muted-foreground">
                      {submissionData.description.length}/1000 characters
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Links and Resources */}
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Link className="w-5 h-5" />
                    Links and Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub Repository *</Label>
                    <div className="relative">
                      <Github className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="github"
                        placeholder="https://github.com/username/repository"
                        value={submissionData.githubRepo}
                        onChange={(e) => handleInputChange("githubRepo", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="demo-video">Demo Video Link</Label>
                      <div className="relative">
                        <Video className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="demo-video"
                          placeholder="https://youtube.com/watch?v=..."
                          value={submissionData.demoVideo}
                          onChange={(e) => handleInputChange("demoVideo", e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="live-demo">Live Demo URL</Label>
                      <div className="relative">
                        <Link className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="live-demo"
                          placeholder="https://your-project-demo.com"
                          value={submissionData.liveDemo}
                          onChange={(e) => handleInputChange("liveDemo", e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* File Upload */}
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Documentation Upload
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                      dragActive
                        ? "border-primary bg-primary/10"
                        : uploadedFile
                          ? "border-green-500 bg-green-500/10"
                          : "border-border hover:border-primary/50"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {uploadedFile ? (
                      <div className="space-y-2">
                        <Check className="w-12 h-12 mx-auto text-green-500" />
                        <h3 className="text-lg font-semibold text-green-500">File Uploaded</h3>
                        <p className="text-sm text-muted-foreground">{uploadedFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        <Button
                          variant="glass"
                          size="sm"
                          onClick={() => {
                            setUploadedFile(null);
                            handleInputChange("documentation", null);
                          }}
                        >
                          Remove File
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <FileText className="w-12 h-12 mx-auto text-muted-foreground" />
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Upload Documentation</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Drop your project documentation here or click to browse
                          </p>
                          <p className="text-xs text-muted-foreground mb-4">
                            Supported formats: {eventInfo.allowedFormats} • Max size: {eventInfo.maxFileSize}
                          </p>
                          <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                          />
                          <Button variant="glass" asChild>
                            <label htmlFor="file-upload" className="cursor-pointer">
                              Choose File
                            </label>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSubmission;