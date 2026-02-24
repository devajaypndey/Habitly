import { useAppSelector } from "@/app/hooks";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <Card>
      <CardHeader>
        <CardTitle>Statistics</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 border rounded-lg">
            <p className="text-lg font-semibold">
              {totalTasks}
            </p>
            <p className="text-sm text-muted-foreground">
              Total Tasks
            </p>
          </div>

          <div className="p-3 border rounded-lg">
            <p className="text-lg font-semibold">
              {activeToday}
            </p>
            <p className="text-sm text-muted-foreground">
              Not Done Today
            </p>
          </div>

          <div className="p-3 border rounded-lg">
            <p className="text-lg font-semibold">
              {completedToday}
            </p>
            <p className="text-sm text-muted-foreground">
              Done Today
            </p>
          </div>

          <div className="p-3 border rounded-lg">
            <p className="text-lg font-semibold">
              {completionRate}%
            </p>
            <p className="text-sm text-muted-foreground">
              Today’s Completion
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskStats;