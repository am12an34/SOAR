
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const OtpAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [sentOtp, setSentOtp] = useState(false);
  const { resetPassword } = useAuth();

  const handleOtpRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await resetPassword(email);
      setSentOtp(true);
    } catch (error) {
      console.error("OTP error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return !sentOtp ? (
    <form onSubmit={handleOtpRequest} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="otpEmail">Email</Label>
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-400">
            <Mail size={16} />
          </span>
          <Input
            id="otpEmail"
            type="email"
            placeholder="your@email.com"
            className="pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-anarc-teal hover:bg-anarc-teal/90"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending reset link...
          </>
        ) : (
          "Send password reset link"
        )}
      </Button>
    </form>
  ) : (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm text-gray-500 text-center">
          A password reset link has been sent to {email}. Please check your email inbox.
        </p>
      </div>

      <Button
        type="button"
        variant="ghost"
        className="w-full"
        onClick={() => setSentOtp(false)}
        disabled={isLoading}
      >
        Back to Email
      </Button>
    </div>
  );
};

export default OtpAuth;
