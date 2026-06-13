import { useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(
    (state) => state.auth.isAuthenticated
  );

  const homePath = isAuthenticated ? "/dashboard" : "/login";

  return (
    <div className="min-h-screen bg-background">
      <div className="notion-topbar border-b border-border">
        <div className="flex items-center gap-1 flex-1 min-w-0">
          <span className="notion-emoji-icon">404</span>
          <span className="text-sm font-medium truncate">Page not found</span>
        </div>
      </div>

      <div className="notion-cover">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, var(--notion-blue-bg) 0%, var(--notion-green-bg) 48%, var(--notion-yellow-bg) 100%)",
          }}
        />
      </div>

      <main className="notion-page pb-24">
        <div className="notion-animate-in max-w-xl">
          <div className="notion-page-icon select-none">404</div>
          <p className="notion-caption mb-2">Missing page</p>
          <p className="notion-body text-muted-foreground mb-8">
            The page you are looking for does not exist, may have moved, or the
            link is no longer valid.
          </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button asChild>
              <Link to={homePath}>
                <Home className="w-4 h-4" />
                {isAuthenticated ? "Go to dashboard" : "Go to login"}
              </Link>
            </Button>

            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4" />
              Go back
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;