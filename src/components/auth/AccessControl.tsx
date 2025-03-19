
import { ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface AccessControlProps {
  children: ReactNode;
  requireAuth?: boolean;
  redirectLoggedInUsers?: boolean;
}

/**
 * Component to control access to routes based on authentication status
 * 
 * @param children - React components to render if access is granted
 * @param requireAuth - If true, redirects to login when user is not authenticated
 * @param redirectLoggedInUsers - If true, redirects authenticated users away from this route
 */
const AccessControl = ({ 
  children, 
  requireAuth = false,
  redirectLoggedInUsers = false 
}: AccessControlProps) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoading) return;

    // Handle case where auth is required but user is not logged in
    if (requireAuth && !user) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    // Handle case where logged in users should be redirected (like login/register pages)
    if (redirectLoggedInUsers && user) {
      navigate("/dashboard");
      return;
    }
  }, [user, isLoading, requireAuth, redirectLoggedInUsers, navigate, location.pathname]);

  // If still loading or redirect conditions are met, don't render children
  if (isLoading || (requireAuth && !user) || (redirectLoggedInUsers && user)) {
    return null;
  }

  return <>{children}</>;
};

export default AccessControl;
