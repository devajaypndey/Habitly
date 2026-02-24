import { useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import { toggleTask, deleteTask, editTask } from "@/features/tasks/taskSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const TaskItem = ({ task }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);

  // Activity-based completion
  const today = new Date().toISOString().split("T")[0];
  const doneToday = task.activity.includes(today);

  const handleSave = () => {
    if (!editText.trim()) return;

    dispatch(editTask({ id: task.id, title: editText }));
    setEditing(false);
  };

  const handleCancel = () => {
    setEditText(task.title);
    setEditing(false);
  };

return (
  <div className="flex items-center justify-between border rounded-lg px-3 py-2">
    {editing ? (
      <div className="flex gap-2 w-full">
        <Input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="flex-1"
        />
        <Button size="sm" onClick={handleSave}>
          Save
        </Button>
        <Button size="sm" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    ) : (
      <>
        <div className="flex items-center gap-3">
          
          {/* Checkbox Button */}
          <button
            onClick={() => dispatch(toggleTask(task.id))}
            className={`w-5 h-5 rounded border flex items-center justify-center text-xs font-bold
              ${
                doneToday
                  ? "bg-green-500 text-white border-green-500"
                  : "border-gray-400"
              }`}
          >
            {doneToday ? "✓" : ""}
          </button>

          {/* Title */}
          <span
            className={`cursor-pointer ${
              doneToday ? "text-muted-foreground" : ""
            }`}
            onClick={() => navigate(`/task/${task.id}`)}
          >
            {task.title}
          </span>

          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              task.priority === "high"
                ? "bg-red-100 text-red-600"
                : task.priority === "medium"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {task.priority}
          </span>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setEditing(true)}
          >
            Edit
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(deleteTask(task.id))}
          >
            Delete
          </Button>
        </div>
      </>
    )}
  </div>
);
};

export default TaskItem;
