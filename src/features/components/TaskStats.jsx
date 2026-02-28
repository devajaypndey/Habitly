import { useAppSelector } from "@/app/hooks";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, CircleDashed, BarChart3 } from "lucide-react";

const TaskStats = () => {
  const tasks = useAppSelector(
    (state) => state.tasks.tasks
  );

  const totalTasks = tasks.length;

  const today = new Date().toISOString().split("T")[0];

  const completedToday = tasks.filter((t) =>
    t.activity.includes(today)
  ).length;

  const activeToday = totalTasks - completedToday;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round((completedToday / totalTasks) * 100);

  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <BarChart3 className="w-5 h-5 text-muted-foreground" />
          Statistics
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">

        {/* HERO COMPLETION */}
        <div className="text-center">
          <p className="text-4xl font-bold tracking-tight">
            {completionRate}%
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Today’s Completion
          </p>
        </div>

        {/* GRID STATS */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

          <div className="p-4 rounded-lg border bg-muted/40 transition hover:bg-muted/60">
            <p className="text-2xl font-semibold">
              {totalTasks}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Total Habits
            </p>
          </div>

          <div className="p-4 rounded-lg border bg-muted/40 transition hover:bg-muted/60">
            <div className="flex items-center gap-2 text-green-500">
              <CheckCircle2 className="w-4 h-4" />
              <p className="text-2xl font-semibold">
                {completedToday}
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Completed Today
            </p>
          </div>

          <div className="p-4 rounded-lg border bg-muted/40 transition hover:bg-muted/60">
            <div className="flex items-center gap-2 text-yellow-500">
              <CircleDashed className="w-4 h-4" />
              <p className="text-2xl font-semibold">
                {activeToday}
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Remaining
            </p>
          </div>
        </div>

        {/* EMPTY STATE ILLUSTRATION */}
        {totalTasks === 0 && (
          <div className="flex flex-col items-center justify-center pt-6 text-center space-y-3">
            <BarChart3 className="w-16 h-16 text-muted-foreground opacity-40" />
            <p className="text-sm text-muted-foreground">
              Add your first habit to see statistics.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskStats;