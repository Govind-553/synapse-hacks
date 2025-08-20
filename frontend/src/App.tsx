import { useState, useEffect } from "react";
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
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const queryClient = new QueryClient();

// This is the main application component that manages authentication state.
const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check local storage for a token and user on initial load
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation user={user} logout={logout} />
          <main className="min-h-screen pt-16">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login login={login} />} />
              <Route path="/register" element={<Register login={login} />} />
              
              {/* Dashboard Routes */}
              <Route path="/dashboard/participant" element={<ParticipantDashboardPage user={user} token={token} />} />
              <Route path="/dashboard/organizer" element={<OrganizerDashboardPage user={user} token={token} />} />
              <Route path="/dashboard/judge" element={<JudgeDashboardPage user={user} token={token} />} />
              
              {/* Feature Routes */}
              <Route path="/submit" element={<ProjectSubmissionPage user={user} token={token} />} />
              <Route path="/announcements" element={<Announcements user={user} token={token} />} />
              <Route path="/leaderboard" element={<Leaderboard user={user} token={token} />} />
              <Route path="/certificates" element={<Certificates user={user} token={token} />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/about" element={<About />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
