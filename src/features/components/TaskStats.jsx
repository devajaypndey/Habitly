import { useGetAllTasks } from "@/api/tasks/apiTasks";
import { CheckCircle2, CircleDashed, BarChart3 } from "lucide-react";

const TaskStats = () => {
  const { data: tasksData, isLoading, isError } = useGetAllTasks();
  const tasks = tasksData?.tasks || [];

  const totalTasks = tasks.length;
  const today = new Date().toISOString().split("T")[0];

  const completedToday = tasks.filter((task) =>
    Array.isArray(task.activity)
      ? task.activity.some((date) => String(date).startsWith(today))
      : false
  ).length;

  const activeToday = totalTasks - completedToday;
  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedToday / totalTasks) * 100);

  if (isLoading) {
    return (
      <div className="p-4 rounded-md bg-secondary/60">
        <p className="notion-caption text-sm">Loading habit statistics...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 rounded-md bg-secondary/60">
        <p className="text-sm text-red-500">Unable to load habit statistics.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
            <span className="notion-heading text-base">Today's Progress</span>
          </div>
          <span className="text-2xl font-semibold tracking-tight">
            {completionRate}%
          </span>
        </div>

        <div className="notion-progress">
          <div
            className="notion-progress-bar"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-md bg-secondary/60 transition-colors hover:bg-secondary">
          <p className="text-xl font-semibold mb-0.5">{totalTasks}</p>
          <p className="notion-caption text-xs">Total Habits</p>
        </div>

        <div className="p-3 rounded-md bg-secondary/60 transition-colors hover:bg-secondary">
          <div className="flex items-center gap-1.5 mb-0.5">
            <CheckCircle2
              className="w-3.5 h-3.5"
              style={{ color: "var(--notion-green)" }}
            />
            <p className="text-xl font-semibold">{completedToday}</p>
          </div>
          <p className="notion-caption text-xs">Done Today</p>
        </div>

        <div className="p-3 rounded-md bg-secondary/60 transition-colors hover:bg-secondary">
          <div className="flex items-center gap-1.5 mb-0.5">
            <CircleDashed
              className="w-3.5 h-3.5"
              style={{ color: "var(--notion-orange)" }}
            />
            <p className="text-xl font-semibold">{activeToday}</p>
          </div>
          <p className="notion-caption text-xs">Remaining</p>
        </div>
      </div>

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
