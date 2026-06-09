import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import TaskHeatmapPage from "@/pages/TaskHeatmapPage";
import Register from "@/pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "@/pages/Profile";
import ForgotPassword from "@/pages/ForgetPassword";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={ <Register /> } />

        <Route path="/dashboard" element={<Dashboard />} />
        
        <Route path="/profile" element={<ProtectedRoute> <Profile/> </ProtectedRoute> } />

        <Route path="/forget-password" element={<ForgotPassword/>} />

        <Route path="/task/:taskId" element={<TaskHeatmapPage />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;