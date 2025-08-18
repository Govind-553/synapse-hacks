import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/NotFound";

// Dashboard Pages
import ParticipantDashboardPage from "@/pages/dashboards/ParticipantDashboard";
import OrganizerDashboardPage from "@/pages/dashboards/OrganizerDashboard";
import JudgeDashboardPage from "@/pages/dashboards/JudgeDashboard";

// Feature Pages
import ProjectSubmissionPage from "@/pages/ProjectSubmission";
import Announcements from "@/pages/Announcements";
import Leaderboard from "@/pages/Leaderboard";
import Certificates from "@/pages/Certificates";
import About from "@/pages/About";
import EventsPage from "@/pages/Events";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard/participant" element={<ParticipantDashboardPage />} />
          <Route path="/dashboard/organizer" element={<OrganizerDashboardPage />} />
          <Route path="/dashboard/judge" element={<JudgeDashboardPage />} />
          
          {/* Feature Routes */}
          <Route path="/submit" element={<ProjectSubmissionPage />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/certificates" element={<Certificates />} />
          
          {/* Corrected Routes */}
          <Route path="/events" element={<EventsPage />} />
          <Route path="/about" element={<About />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
