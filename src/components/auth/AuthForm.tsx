
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Import individual auth components
import EmailPasswordAuth from "./EmailPasswordAuth";
import OtpAuth from "./OtpAuth";
import GoogleAuth from "./GoogleAuth";
import EmailConfirmationAlert from "./EmailConfirmationAlert";

type AuthFormProps = {
  isRegister?: boolean;
};

const AuthForm = ({ isRegister = false }: AuthFormProps) => {
  const [authMethod, setAuthMethod] = useState("email");
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);

  const location = useLocation();
  const { user } = useAuth();

  // Listen for custom event to switch auth methods
  useEffect(() => {
    const handleSwitchAuthMethod = (e: CustomEvent) => {
      if (e.detail) {
        setAuthMethod(e.detail);
      }
    };

    window.addEventListener('switch-auth-method', handleSwitchAuthMethod as EventListener);
    
    return () => {
      window.removeEventListener('switch-auth-method', handleSwitchAuthMethod as EventListener);
    };
  }, []);

  // Check if there's a confirmation token in the URL
  useEffect(() => {
    const checkEmailConfirmation = async () => {
      // Get URL hash parameters
      const hashParams = new URLSearchParams(location.hash.substring(1));
      const type = hashParams.get('type');
      
      if (type === 'email_confirmation') {
        setShowConfirmMessage(true);
        
        // Check confirmation status
        try {
          const { data, error } = await supabase.auth.getSession();
          if (!error && data.session) {
            setEmailConfirmed(true);
            toast.success("Email confirmed successfully!");
          }
        } catch (error) {
          console.error("Error checking confirmation:", error);
        }
      }
    };

    checkEmailConfirmation();
  }, [location]);

  // Also check if user's email is confirmed when user changes
  useEffect(() => {
    setEmailConfirmed(!!user?.email_confirmed_at);
  }, [user]);

  return (
    <div className="w-full max-w-md mx-auto">
      <EmailConfirmationAlert 
        showConfirmMessage={showConfirmMessage} 
        emailConfirmed={emailConfirmed} 
      />

      <Tabs defaultValue="email" className="w-full" onValueChange={setAuthMethod} value={authMethod}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="otp">Reset</TabsTrigger>
          <TabsTrigger value="google">Google</TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="mt-6">
          <EmailPasswordAuth isRegister={isRegister} />
        </TabsContent>

        <TabsContent value="otp" className="mt-6">
          <OtpAuth />
        </TabsContent>

        <TabsContent value="google" className="mt-6">
          <GoogleAuth />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthForm;
