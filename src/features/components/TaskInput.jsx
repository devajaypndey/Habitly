import { useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import { addTask } from "@/features/tasks/taskSlice";
import { Plus } from "lucide-react";

const TaskInput = () => {
  const dispatch = useAppDispatch();

  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("positive");
  const [isFocused, setIsFocused] = useState(false);

  const handleAddTask = () => {
    if (!newTask.trim()) return;

    dispatch(
      addTask({
        title: newTask,
        priority,
        dueDate: null,
      })
    );

    setNewTask("");
    setPriority("positive");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const priorityOptions = [
    {
      value: "positive",
      label: "Positive",
      className: "notion-tag-green",
    },
    {
      value: "neutral",
      label: "Neutral",
      className: "notion-tag-blue",
    },
    {
      value: "negative",
      label: "Negative",
      className: "notion-tag-red",
    },
  ];

  return (
    <div
      className={`rounded-md border transition-all duration-150 ${
        isFocused
          ? "border-(--notion-blue) shadow-[0_0_0_1px_var(--notion-blue)]"
          : "border-border"
      }`}
    >
      {/* Input row */}
      <div className="flex items-center gap-2 px-3 py-2">
        <Plus className="w-4 h-4 text-muted-foreground shrink-0" />
        <input
          placeholder="Type a habit name..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          className="notion-inline-input flex-1 p-0! bg-transparent! text-sm"
        />
      </div>

      {/* Bottom toolbar (shows when focused or has text) */}
      {(isFocused || newTask.trim()) && (
        <div className="flex items-center justify-between px-3 py-2 border-t border-border notion-animate-in">
          {/* Priority tags */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground mr-1">Type:</span>
            {priorityOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setPriority(opt.value)}
                onMouseDown={(e) => e.preventDefault()} // prevent blur
                className={`notion-tag cursor-pointer transition-all ${
                  priority === opt.value
                    ? opt.className
                    : "bg-secondary text-muted-foreground hover:bg-accent"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Add button */}
          <button
            onClick={handleAddTask}
            onMouseDown={(e) => e.preventDefault()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium
                       bg-(--notion-blue) text-white hover:opacity-90 transition-opacity"
          >
            <Plus className="w-3 h-3" />
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskInput;