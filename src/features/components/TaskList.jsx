import TaskItem from "./TaskItem";
import { ClipboardList } from "lucide-react";
import { useGetAllTasks } from "../../api/tasks/apiTasks";

const TaskList = () => {
  const { data: tasksData, isLoading, isError } = useGetAllTasks();

  
  const tasks = tasksData?.tasks || [];

  const filteredTasks = tasks.filter(() => {
    return true; 
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="mt-4 text-sm text-muted-foreground">Wait!! we're loading tasks...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-sm text-red-500">Oops! Error loading tasks</p>
      </div>
    );
  }

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
