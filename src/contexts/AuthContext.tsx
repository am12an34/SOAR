import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";


interface UserData {
  name: string;
  phone?: string;
  department?: string;
  rollNumber?: string;
  semester?: string;
}

interface AuthContextType {
  user: any;
  isLoading: boolean;
  signUp: (email: string, password: string, userData: UserData) => void;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  signInWithGoogle: () => void;
  resetPassword: (email: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, userData: UserData) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;

      if (data.user && data.user?.confirmed_at) {
        await supabase.from("students").insert({
          id: data.user.id,
          name: userData.name,
          email,
          phone: userData.phone || "",
          department: userData.department || "",
          roll_number: userData.rollNumber || "",
          semester: userData.semester || "",
        });

        await supabase.from("registrations").insert({
          student_id: data.user.id,
          exam_id: "1",
          reg_number: userData.rollNumber,
          registration_date: new Date().toISOString(),
          status: "Pending",
          admit_card_generated: false,
        });
      }
      
      toast.success("Registration successful! Check your email.");
      navigate("/success");
    } catch (error: any) {
      if (error.message.includes("already exists")) {
        toast.error("This email is already registered. Please log in.");
      } else {
        toast.error(error.message || "Error during registration.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Successfully signed in!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Error signing in");
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      toast.success("Signed out successfully");
      navigate("/login");
    } catch (error: any) {
      toast.error("Error signing out");
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/dashboard` }
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || "Google sign-in failed");
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      toast.success("Password reset email sent.");
    } catch (error: any) {
      toast.error(error.message || "Error resetting password");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, signUp, signIn, signOut, signInWithGoogle, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
