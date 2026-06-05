import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toggleTheme } from "@/features/ui/uiSlice";
import TaskStats from "@/features/components/TaskStats";
import TaskInput from "@/features/components/TaskInput";
import TaskFilters from "@/features/components/TaskFilters";
import TaskList from "@/features/components/TaskList";
import { Sun, Moon, ChevronRight, MoreHorizontal } from "lucide-react";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useAppSelector((state) => state.ui.theme);
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">


      <div
        className={`notion-topbar ${scrolled ? "scrolled" : ""}`}
      >
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

          <button className="notion-icon-btn">
            <MoreHorizontal className="w-4 h-4" />
          </button>
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

      {/*--- page content -- */}
      <div className="notion-page pb-24">

        {/* Page Icon */}
        {/* <div className="notion-page-icon select-none">🌿</div> */}


        <h1 className="notion-title text-[40px] mb-1">Habitly</h1>

        {/* Subtitle / Date */}
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
