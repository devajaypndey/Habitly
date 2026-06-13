import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import TaskHeatmapPage from "@/pages/TaskHeatmapPage";
import Register from "@/pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "@/pages/Profile";
import ForgotPassword from "@/pages/ForgetPassword";
import NotFound from "@/pages/NotFound";
import { useAppSelector } from "@/app/hooks";
import PublicRoute from "./PublicRoute";

  function HomeRedirect(){
    const isAuthenticated = useAppSelector(
      (state) => state.auth.isAuthenticated
    );

    return(
      <Navigate to={isAuthenticated ? '/dashboard' : '/login'} 
      replace
      />
    )
  }

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={ <HomeRedirect/> } />

        <Route path="/login" element={<PublicRoute> <Login /> </PublicRoute>} />

        <Route path="/register" element={ <PublicRoute> <Register/> </PublicRoute> } />

        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /></ProtectedRoute>} />
        
        <Route path="/profile" element={<ProtectedRoute> <Profile/> </ProtectedRoute> } />

        <Route path="/forget-password" element={<PublicRoute> <ForgotPassword/> </PublicRoute>} />

        <Route path="/task/:taskId" element={<ProtectedRoute> <TaskHeatmapPage/> </ProtectedRoute>} />

        <Route path="*" element={<NotFound/>} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;