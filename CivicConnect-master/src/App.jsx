import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import AuroraBackground from "./components/layout/AuroraBackground.jsx";

// User Pages
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ReportIssuePage from "./pages/ReportIssuePage.jsx";
import TrackComplaintPage from "./pages/TrackComplaintPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// Protected Route
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";

// =======================
// Admin Pages
// =======================
import AdminLoginPage from "./pages/admin/Login.jsx";
import AdminDashboardPage from "./pages/admin/Dashboard.jsx";
import AdminComplaintsPage from "./pages/admin/Complaints.jsx";
import AdminUsersPage from "./pages/admin/Users.jsx";

export default function App() {
  const location = useLocation();

  return (
    <>
      <AuroraBackground />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}

          <Route path="/" element={<LandingPage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />

          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          <Route path="/reset-password" element={<ResetPasswordPage />} />

          <Route path="/report" element={<ReportIssuePage />} />

          <Route path="/track" element={<TrackComplaintPage />} />

          {/* Protected User Dashboard */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* ===========================
               ADMIN ROUTES
          =========================== */}

          <Route path="/admin/login" element={<AdminLoginPage />} />

          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

          <Route path="/admin/complaints" element={<AdminComplaintsPage />} />

          <Route path="/admin/users" element={<AdminUsersPage />} />

          {/* 404 */}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}