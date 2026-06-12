import { useAppDispatch } from "@/app/hooks";
import { useUpdateTask } from "@/api/tasks/apiTasks";
import { toggleTask } from "@/features/tasks/taskSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Flame, Check, GripVertical, ArrowUpRight } from "lucide-react";

const TaskItem = ({ task }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const updateTaskMutation = useUpdateTask();
  const taskId = task._id || task.id;

  const today = new Date().toISOString().split("T")[0];
  const activity = task.activity || [];
  const doneToday = activity.includes(today);

  const handleToggleTask = (e) => {
    e.stopPropagation();

    const nextActivity = doneToday
      ? activity.filter((date) => date !== today)
      : [...activity, today];

    updateTaskMutation.mutate(
      {
        taskId,
        title: task.title,
        priority: task.priority,
        activity: nextActivity,
      },
      {
        onSuccess: () => {
          dispatch(toggleTask(taskId));
        },
        onError: (error) => {
          toast.error(error.message || "Failed to update task");
        },
      }
    );
  };

  // Mini Streak Calculation
  const uniqueDates = [...new Set(activity)].sort();
  let streak = 0;

  if (uniqueDates.includes(today)) {
    streak = 1;
    let checkDate = new Date();
    checkDate.setDate(checkDate.getDate() - 1);

    while (
      uniqueDates.includes(
        checkDate.toISOString().split("T")[0]
      )
    ) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    }
  }

  // Priority indicator dot
  const priorityColor =
    task.priority === "negative"
      ? "var(--notion-red)"
      : task.priority === "positive"
      ? "var(--notion-green)"
      : "var(--notion-blue)";

  return (
    <div
      className="notion-row group"
      onClick={() => navigate(`/task/${taskId}`)}
    >
      {/* Drag handle (visual only) */}
      <div className="opacity-0 group-hover:opacity-40 transition-opacity">
        <GripVertical className="w-3.5 h-3.5 text-muted-foreground" />
      </div>

      {/* Checkbox */}
      <button
        onClick={handleToggleTask}
        disabled={updateTaskMutation.isPending}
        className={`notion-checkbox ${doneToday ? "checked" : ""}`}
        aria-label={doneToday ? "Mark as incomplete" : "Mark as complete"}
      >
        {doneToday && <Check className="w-3 h-3 text-white" />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={`text-sm leading-snug transition-colors ${
              doneToday
                ? "line-through text-muted-foreground"
                : "text-foreground"
            }`}
          >
            {task.title}
          </span>

          {/* Priority dot */}
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: priorityColor }}
          />
        </div>

        {/* Streak badge */}
        {streak > 0 && (
          <div className="flex items-center gap-1 mt-0.5">
            <Flame className="w-3 h-3" style={{ color: "var(--notion-orange)" }} />
            <span className="text-[11px]" style={{ color: "var(--notion-orange)" }}>
              {streak} day streak
            </span>
          </div>
        )}
      </div>

      {/* Open arrow */}
      <div className="opacity-0 group-hover:opacity-60 transition-opacity">
        <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
      </div>
    </div>
  );
};

export default TaskItem;
