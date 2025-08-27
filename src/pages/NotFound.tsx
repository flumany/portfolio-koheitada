import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Detect if we're on English routes
  const isEnglish = location.pathname.startsWith('/en');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-nordic-beige/30 to-white">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="text-8xl font-bold text-nordic-blue/20 mb-4">404</div>
        <h1 className="text-2xl font-bold text-nordic-dark mb-4">
          {isEnglish ? "Page Not Found" : "ページが見つかりません"}
        </h1>
        <p className="text-nordic-dark/70 mb-8 leading-relaxed">
          {isEnglish 
            ? "The page you're looking for doesn't exist or has been moved. Please check the URL or return to the homepage."
            : "お探しのページは存在しないか、移動された可能性があります。URLをご確認いただくか、ホームページに戻ってください。"
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => window.history.back()} 
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {isEnglish ? "Go Back" : "戻る"}
          </Button>
          <Button asChild>
            <Link to={isEnglish ? "/en" : "/"} className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              {isEnglish ? "Home" : "ホーム"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
