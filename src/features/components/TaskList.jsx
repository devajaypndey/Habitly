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

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center notion-animate-in">
        <div
          className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
          style={{ background: "var(--notion-blue-bg)" }}
        >
          <ClipboardList className="w-7 h-7" style={{ color: "var(--notion-blue)" }} />
        </div>

        <h3 className="text-base font-medium mb-1">No habits yet</h3>
        <p className="notion-caption max-w-70">
          Start building your streak today. Add your first habit above and watch your progress grow.
        </p>
      </div>
    );
  }

  return (
    <div className="notion-stagger">
      {/* Notion-style table header */}
      <div className="flex items-center gap-2 px-10 py-1.5 text-xs text-muted-foreground font-medium border-b border-border mb-1">
        <span className="flex-1">Name</span>
        <span className="w-16 text-right">Status</span>
      </div>

      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}

      {filteredTasks.length === 0 && tasks.length > 0 && (
        <div className="py-8 text-center">
          <p className="notion-caption">No habits match this filter.</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
