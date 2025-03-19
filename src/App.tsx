
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Exams from "./pages/Exams";
import Success from "./pages/Success";
import Contact from "./pages/Contact";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import AccessControl from "./components/auth/AccessControl";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/exams" element={<Exams />} />
              <Route path="/success" element={<AccessControl redirectLoggedInUsers><Success /></AccessControl>} />
              <Route path="/reset-password" element={<ProtectedRoute><ResetPassword /></ProtectedRoute>} />

              {/* Public routes that redirect logged-in users */}
              <Route path="/login" element={
                <AccessControl redirectLoggedInUsers>
                  <Login />
                 </AccessControl>
              } />
              <Route path="/register" element={
                <AccessControl redirectLoggedInUsers>
                  <Register />
                </AccessControl>
              } />
              
              {/* Protected routes that require authentication */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
