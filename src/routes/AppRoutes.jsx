import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import TaskHeatmapPage from "@/pages/TaskHeatmapPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Login for future */}
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/task/:id" element={<TaskHeatmapPage />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;