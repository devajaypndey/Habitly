import { useAppSelector } from "@/app/hooks";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const { tasks, filter, searchTerm } = useAppSelector(
    (state) => state.tasks
  );

  const today = new Date().toISOString().split("T")[0];

  const filteredTasks = tasks
    .filter((task) => {
      const doneToday = task.activity.includes(today);

      if (filter === "active") return !doneToday;
      if (filter === "completed") return doneToday;
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-2">
      {tasks.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No tasks yet.
        </p>
      )}

      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;