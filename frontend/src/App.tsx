import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ActivateAccount from "./pages/ActivateAccount";
import CandidatesList from "./pages/CandidatesList";
import InvitesList from "./pages/InvitesList";
import UserDetail from "./pages/UserDetail";
import Layout from "./components/Layout";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/activate" element={<ActivateAccount />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Navigate to="/candidates" replace />} />
                <Route
                  path="candidates"
                  element={
                    <ProtectedRoute requiredRole="ADMIN">
                      <CandidatesList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="invites"
                  element={
                    <ProtectedRoute requiredRole="CANDIDATE">
                      <InvitesList />
                    </ProtectedRoute>
                  }
                />
                <Route path="profile/:userId?" element={<UserDetail />} />
              </Route>
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
