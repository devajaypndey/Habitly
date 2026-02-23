import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/auth/authSlice";
import { setFilter } from "../features/tasks/taskSlice";
import { addTask, toggleTask, deleteTask } from "../features/tasks/taskSlice";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toggleTheme } from "@/features/ui/uiSlice";
import { editTask } from "../features/tasks/taskSlice";
import { clearCompleted } from "../features/tasks/taskSlice";
import TaskStats from "@/features/components/TaskStats";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);
  const { tasks, filter } = useAppSelector((state) => state.tasks);
  const theme = useAppSelector((state) => state.ui.theme);

  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const task = useAppSelector((state) => state.tasks);

  const [priority, setPriority] = useState("medium");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleAddTask = () => {
    if (!newTask.trim()) return;

    dispatch(
      addTask({
        title: newTask,
        priority,
        dueDate: null,
      }),
    );

    setNewTask("");
    setPriority("medium");
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const handleEditStart = (task) => {
    setEditingId(task.id);
    setEditText(task.title);
  };

  const handleEditSave = (task) => {
    if (!editText.trim()) return;

    dispatch(editTask({ id, title: editText }));
    setEditingId(null);
    setEditText("");
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditText("");
  };


  return (
    <div className="min-h-screen bg-muted/40 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Dashboard</h1>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => dispatch(toggleTheme())}
            >
              {theme === "light" ? "Dark" : "Light"}
            </Button>

            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        {/* User Info */}
        <Card>
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            <p>
              <span className="font-medium">Name:</span> {user?.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {user?.email}
            </p>
          </CardContent>
        </Card>

        {/* Statistics */}
        <TaskStats/>

        {/* Tasks Section */}
        <Card>
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Add Task */}
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

            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => dispatch(setFilter("all"))}
              >
                All
              </Button>

              <Button
                variant={filter === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => dispatch(setFilter("active"))}
              >
                Active
              </Button>

              <Button
                variant={filter === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => dispatch(setFilter("completed"))}
              >
                Completed
              </Button>
            </div>

            <div className="flex justify-end">
              <Button
                size="sm"
                variant="destructive"
                onClick={() => dispatch(clearCompleted())}
              >
                Clear Completed
              </Button>
            </div>

            {/* Task List */}
            <div className="space-y-2">
              {tasks.length === 0 && (
                <p className="text-sm text-muted-foreground">No tasks yet.</p>
              )}

              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between border rounded-lg px-3 py-2"
                >
                  {editingId === task.id ? (
                    <div className="flex gap-2 w-full">
                      <Input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-1"
                      />
                      <Button size="sm" onClick={() => handleEditSave(task.id)}>
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleEditCancel}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <span
                          className={`cursor-pointer ${
                            task.completed
                              ? "line-through text-muted-foreground"
                              : ""
                          }`}
                          onClick={() => dispatch(toggleTask(task.id))}
                        >
                          {task.title}
                        </span>

                        {/* Priority Badge */}
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
                          onClick={() => handleEditStart(task)}
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
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
