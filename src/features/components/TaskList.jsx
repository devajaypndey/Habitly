import { useAppSelector } from "@/app/hooks";
import TaskItem from "./TaskItem";
import { ClipboardList } from "lucide-react";

const TaskList = () => {
  const { tasks, filter, searchTerm } = useAppSelector((state) => state.tasks);

  const today = new Date().toISOString().split("T")[0];

  const filteredTasks = tasks
    .filter((task) => {
      const doneToday = task.activity.includes(today);

      if (filter === "active") return !doneToday;
      if (filter === "completed") return doneToday;
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  return (
    <div className="space-y-2">
      {tasks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
          <ClipboardList className="w-16 h-16 text-green-500 opacity-80" />

          <h2 className="text-xl font-semibold">No tasks yet</h2>

          <p className="text-muted-foreground max-w-sm">
            Start building your streak today. Add your first habit and watch
            your calendar turn green.
          </p>
        </div>
      )}

      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
