
import { CheckCircle, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type EmailConfirmationAlertProps = {
  showConfirmMessage: boolean;
  emailConfirmed: boolean;
};

const EmailConfirmationAlert = ({ 
  showConfirmMessage, 
  emailConfirmed 
}: EmailConfirmationAlertProps) => {
  if (!showConfirmMessage) return null;

  return (
    <Alert className={`mb-6 ${emailConfirmed ? 'bg-green-50' : 'bg-amber-50'}`}>
      {emailConfirmed ? (
        <CheckCircle className="h-4 w-4 text-green-500" />
      ) : (
        <AlertTriangle className="h-4 w-4 text-amber-500" />
      )}
      <AlertTitle>{emailConfirmed ? "Email Confirmed" : "Email Confirmation Required"}</AlertTitle>
      <AlertDescription>
        {emailConfirmed 
          ? "Your email has been confirmed! You can now sign in."
          : "We've sent a confirmation link to your email. Please check your inbox and verify your account."}
      </AlertDescription>
    </Alert>
  );
};

export default EmailConfirmationAlert;
