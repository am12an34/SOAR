
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check active session and set user
    const getSession = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error);
      } else if (data.session) {
        setSession(data.session);
        setUser(data.session.user);
      }

      setIsLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state change event:", event);
        setSession(session);
        setUser(session?.user ?? null);

        // Only handle specific events
        if (event === 'SIGNED_IN') {
          if (session?.user) {
            toast.success("Successfully signed in!");
            navigate("/dashboard");
          }
        } else if (event === 'SIGNED_OUT') {
          toast.success("Successfully signed out");
          navigate("/");
        }

        setIsLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || "Error signing in");
    } finally {
      setIsLoading(false);
      navigate("/login");
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, userData: any) => {
    try {
      setIsLoading(true);
  
      // Step 1: Register the user with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: userData.name,
            phone: userData.phone || "",
            department: userData.department || "",
            roll_number: userData.rollNumber || "",
            semester: userData.semester || "",
          },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });
  
      if (error) throw error;
  
      // Step 2: Proceed only if user creation was successful
      if (data.user) {
        
        // Insert student profile
        const { error: profileError } = await supabase.from("students").insert({
          id: data.user.id,
          name: userData.name,
          email: email,
          phone: userData.phone || "",
          department: userData.department || "",
          roll_number: userData.rollNumber || "",
          semester: userData.semester || "",
        });
  
        if (profileError) throw profileError;
        // Insert registration details
        const { error: regError } = await supabase
          .from("registrations")
          .insert({
            student_id: data.user.id,
            exam_id: "1",
            reg_number: userData.rollNumber,
            registration_date: new Date().toISOString(),
            status: "Pending",
            admit_card_generated: false,
          });
      navigate("/success");
        
  
        if (regError) throw regError;
  
        toast.success("Registration successful! Please check your email to confirm your account.");
      }
    } catch (error: any) {
      if (error.code === "23505"){
      toast.error('This email is already registered. Please log in or use a different email.');

      }
      console.error("Error signing up:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/profile`
        }
      });

      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || "Error signing in with Google");
      console.error("Error signing in with Google:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || "Error signing out");
      console.error("Error signing out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast.success("Password reset instructions sent to your email");
    } catch (error: any) {
      toast.error(error.message || "Error resetting password");
      console.error("Error resetting password:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
