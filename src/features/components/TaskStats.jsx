import { useAppSelector } from "@/app/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TaskStats = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const activeTasks = totalTasks - completedTasks;

  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistics</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 border rounded-lg">
            <p className="text-lg font-semibold">{totalTasks}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </div>

          <div className="p-3 border rounded-lg">
            <p className="text-lg font-semibold">{activeTasks}</p>
            <p className="text-sm text-muted-foreground">Active</p>
          </div>

          <div className="p-3 border rounded-lg">
            <p className="text-lg font-semibold">{completedTasks}</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>

          <div className="p-3 border rounded-lg">
            <p className="text-lg font-semibold">{completionRate}%</p>
            <p className="text-sm text-muted-foreground">Completion</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskStats;
