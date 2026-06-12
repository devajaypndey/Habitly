import { useAppSelector } from "@/app/hooks";
import { CheckCircle2, CircleDashed, BarChart3 } from "lucide-react";

const TaskStats = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const totalTasks = tasks.length;

  const today = new Date().toISOString().split("T")[0];

  const completedToday = tasks.filter((t) =>
    t.activity?.includes(today)
  ).length;

  const activeToday = totalTasks - completedToday;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round((completedToday / totalTasks) * 100);

  return (
    <div>
      {/* Progress Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="notion-emoji-icon">📊</span>
            <span className="notion-heading text-base">Today's Progress</span>
          </div>
          <span className="text-2xl font-semibold tracking-tight">
            {completionRate}%
          </span>
        </div>

        {/* Notion-style progress bar */}
        <div className="notion-progress">
          <div
            className="notion-progress-bar"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-3">
        {/* Total */}
        <div className="p-3 rounded-md bg-secondary/60 transition-colors hover:bg-secondary">
          <p className="text-xl font-semibold mb-0.5">{totalTasks}</p>
          <p className="notion-caption text-xs">Total Habits</p>
        </div>

        {/* Completed */}
        <div className="p-3 rounded-md bg-secondary/60 transition-colors hover:bg-secondary">
          <div className="flex items-center gap-1.5 mb-0.5">
            <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "var(--notion-green)" }} />
            <p className="text-xl font-semibold">{completedToday}</p>
          </div>
          <p className="notion-caption text-xs">Done Today</p>
        </div>

        {/* Remaining */}
        <div className="p-3 rounded-md bg-secondary/60 transition-colors hover:bg-secondary">
          <div className="flex items-center gap-1.5 mb-0.5">
            <CircleDashed className="w-3.5 h-3.5" style={{ color: "var(--notion-orange)" }} />
            <p className="text-xl font-semibold">{activeToday}</p>
          </div>
          <p className="notion-caption text-xs">Remaining</p>
        </div>
      </div>

      {/* Empty State */}
      {totalTasks === 0 && (
        <div className="flex flex-col items-center justify-center pt-8 pb-4 text-center">
          <BarChart3 className="w-12 h-12 text-muted-foreground opacity-30 mb-3" />
          <p className="notion-caption">
            Add your first habit to see statistics.
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskStats;