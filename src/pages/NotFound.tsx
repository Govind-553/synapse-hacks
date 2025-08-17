import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background tech-grid">
      <div className="text-center">
        <div className="glass-card p-12 max-w-md mx-auto">
          <h1 className="text-6xl font-bold text-gradient mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-6">Oops! Page not found</p>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <a 
            href="/" 
            className="inline-flex items-center justify-center h-12 px-8 py-3 rounded-xl text-sm font-medium bg-gradient-primary text-primary-foreground hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
