import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Code2, Trophy, Users, LayoutDashboard, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define the types for the props the component will receive
interface NavigationProps {
  user: {
    name: string;
    email: string;
    avatar: string;
    role: "participant" | "organizer" | "judge";
  } | null;
  logout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ user, logout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // A helper function to get the appropriate dashboard link based on user role
  const getDashboardLink = () => {
    if (!user) return "/login"; // Should not happen if this function is called when logged in
    switch (user.role) {
      case "participant":
        return "/participant-dashboard";
      case "organizer":
        return "/organizer-dashboard";
      case "judge":
        return "/judge-dashboard";
      default:
        return "/";
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-card border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">SynapseHacks</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/events" className="text-foreground/80 hover:text-foreground animated-underline">
              Events
            </Link>
            <Link to="/leaderboard" className="text-foreground/80 hover:text-foreground animated-underline">
              Leaderboard
            </Link>
            <Link to="/about" className="text-foreground/80 hover:text-foreground animated-underline">
              About
            </Link>
          </div>

          {/* Desktop Auth/User Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="glass" className="space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>
                        {/* FIX: Add a check to prevent crash on initial render */}
                        {user.name && user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 glass-card border-white/10">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={getDashboardLink()}>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} asChild>
                    <Link to="/">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="glass" size="sm" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant="hero" size="sm" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/95 backdrop-blur-xl rounded-xl mt-2 border border-white/10">
              <Link
                to="/events"
                className="block px-3 py-2 text-foreground/80 hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>
              <Link
                to="/leaderboard"
                className="block px-3 py-2 text-foreground/80 hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Leaderboard
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-foreground/80 hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                {user ? (
                  <>
                    <Button variant="hero" size="sm" asChild>
                      <Link to={getDashboardLink()} onClick={() => setIsMenuOpen(false)}>
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button variant="glass" size="sm" onClick={() => { setIsMenuOpen(false); logout(); }}>
                      <Link to="/">Logout</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="glass" size="sm" asChild onClick={() => setIsMenuOpen(false)}>
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button variant="hero" size="sm" asChild onClick={() => setIsMenuOpen(false)}>
                      <Link to="/register">Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
