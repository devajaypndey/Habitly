import { useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import { addTask } from "@/features/tasks/taskSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CircleFadingPlus } from "lucide-react";

const TaskInput = () => {
  const dispatch = useAppDispatch();

  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("positive");

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

  const priorityStyles = {
    positive:
      "border-yellow-500 text-yellow-600 bg-yellow-500/10 dark:bg-yellow-900/20",
    neutral:
      "border-gray-400 text-blue-400 bg-blue-500/10 dark:bg-gray-400/10",
    negative:
      "border-red-500 text-red-600 bg-red-500/10 dark:bg-red-600/10",
  };

  return (
    <Card className="p-6 space-y-5 shadow-md">

      <div>
        <Input
          placeholder="What habit are you building?"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="h-12 text-base"
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">
          Priority
        </p>

        <div className="flex flex-wrap gap-3">
          {["positive", "neutral", "negative"].map((type) => (
            <button
              key={type}
              onClick={() => setPriority(type)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-all
                ${
                  priority === type
                    ? priorityStyles[type]
                    : "border-muted hover:bg-muted/50"
                }
              `}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleAddTask}
          className="px-6 h-11 text-base flex items-center gap-2"
        >
          <CircleFadingPlus className="w-4 h-4" />
          Add Habit
        </Button>
      </div>
    </Card>
  );
};

export default TaskInput;