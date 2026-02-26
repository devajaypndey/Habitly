import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toggleTheme } from "@/features/ui/uiSlice";
import TaskStats from "@/features/components/TaskStats";
import TaskInput from "@/features/components/TaskInput";
import TaskFilters from "@/features/components/TaskFilters";
import TaskList from "@/features/components/TaskList";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const { user } = useAppSelector((state) => state.auth);
  const theme = useAppSelector((state) => state.ui.theme);

  const task = useAppSelector((state) => state.tasks);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-muted/40 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Habitly.</h1>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => dispatch(toggleTheme())}
            >
              {theme === "light" ? "Dark" : "Light"}
            </Button>

            {/* <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button> */}
          </div>
        </div>

        {/* User Info */}
        {/* <Card>
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
        </Card> */}

        {/* Statistics */}
        <TaskStats/>

        {/* Tasks Section */}
        <Card>
          <CardHeader>
            <CardTitle>Habits</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            {/* Add Task */}
            <TaskInput />

            {/* Filters */}
            <TaskFilters />

            {/* Task List */}
            <TaskList />
            
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
