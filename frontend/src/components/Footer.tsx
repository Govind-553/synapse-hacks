import { Link } from "react-router-dom";
import { Code2, Github, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background/95 backdrop-blur-xl border-t border-white/10 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">SynapseHacks</span>
            </Link>
            <p className="text-muted-foreground mb-6 text-sm">
              Empowering innovation through hackathons. Join the next generation 
              of developers, creators, and entrepreneurs.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/synapsehacks" 
                className="w-10 h-10 glass-card rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/synapsehacks" 
                className="w-10 h-10 glass-card rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com/company/synapsehacks" 
                className="w-10 h-10 glass-card rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/events" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Browse Events
                </Link>
              </li>
              <li>
                <Link to="/host" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Host Event
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/certificates" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Certificates
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/docs" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  API Reference
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-muted-foreground text-sm">
                <Mail className="w-4 h-4 mr-3" />
                hello@synapsehacks.com
              </li>
              <li className="flex items-center text-muted-foreground text-sm">
                <Phone className="w-4 h-4 mr-3" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-start text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 mr-3 mt-0.5" />
                <span>San Francisco, CA<br />United States</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-muted-foreground text-sm mb-4 md:mb-0">
              © 2024 SynapseHacks. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;