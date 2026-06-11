import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toggleTheme } from "@/features/ui/uiSlice";
import TaskStats from "@/features/components/TaskStats";
import TaskInput from "@/features/components/TaskInput";
import TaskFilters from "@/features/components/TaskFilters";
import TaskList from "@/features/components/TaskList";
import { Sun, Moon, ChevronRight, MoreHorizontal, LogOut, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLogout } from "../api/auth/apiAuth";
import { toast } from "react-toastify";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logoutMutation = useLogout();
  const theme = useAppSelector((state) => state.ui.theme);
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const [scrolled, setScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const handleProfile = () => {
    setShowMenu(false);
    navigate("/profile");
  };

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: (data) => {
        dispatch(logout());
        toast.success(data.message);
        navigate("/login");
      },
      onError: (error) => {
        toast.error(error.message || "Logout failed");
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className={`notion-topbar ${scrolled ? "scrolled" : ""}`}>
        <div className="flex items-center gap-1 flex-1 min-w-0">
          <span className="notion-emoji-icon">🌿</span>
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <span className="text-sm font-medium truncate">Habitly</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="notion-icon-btn"
            title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </button>

        
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="notion-icon-btn"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg z-50 notion-animate-in">
                <button
                  onClick={handleProfile}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-accent transition-colors border-b border-border"
                >
                  <User className="w-4 h-4" />
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-accent transition-colors text-red-500 disabled:opacity-50"
                >
                  <LogOut className="w-4 h-4" />
                  {logoutMutation.isPending ? "Logging out..." : "Logout"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* -- cover --- */}
      <div className="notion-cover">
        <div
          className="absolute inset-0"
          style={{
            background:
              theme === "light"
                ? "linear-gradient(135deg, #E8F4F8 0%, #D4E6D9 30%, #F0EAD6 70%, #E8E1CF 100%)"
                : "linear-gradient(135deg, #1B2A2F 0%, #1F2B24 30%, #2A2720 70%, #252220 100%)",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      
      <div className="notion-page pb-24">
        <h1 className="notion-title text-[40px] mb-1">Habitly</h1>

        
        <p className="notion-caption text-base mb-1">{dateStr}</p>
        <p className="notion-caption mb-8">
          Track your daily habits. Build consistency. One day at a time.
        </p>

        <div className="notion-animate-in mb-8">
          <TaskStats />
        </div>

        <div className="notion-divider mb-6" />

        <div className="notion-animate-in" style={{ animationDelay: "80ms" }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="notion-emoji-icon">📋</span>
            <h2 className="notion-heading text-lg">Habits</h2>
            <span className="notion-caption ml-1">
              {tasks.length} {tasks.length === 1 ? "item" : "items"}
            </span>
          </div>

          {/* add habit */}
          <div className="mb-4">
            <TaskInput />
          </div>

          {/* filters */}
          <div className="mb-4">
            <TaskFilters />
          </div>

          {/* task list */}
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;