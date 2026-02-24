import { useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import { addTask } from "@/features/tasks/taskSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TaskInput = () => {
  const dispatch = useAppDispatch();

  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("medium");

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
    setPriority("medium");
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Enter task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="flex-1"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border rounded-md px-2"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <Button onClick={handleAddTask}>Add</Button>
    </div>
  );
};

export default TaskInput;