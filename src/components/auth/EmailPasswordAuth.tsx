
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

type EmailPasswordAuthProps = {
  isRegister?: boolean;
};

const EmailPasswordAuth = ({ isRegister = false }: EmailPasswordAuthProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { signIn, signUp } = useAuth();

  const handleEmailPasswordAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isRegister) {
        await signUp(email, password, { name });
      } else {
        await signIn(email, password);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleEmailPasswordAuth} className="space-y-4">
      {isRegister && (
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">
              <User size={16} />
            </span>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              className="pl-10"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-400">
            <Mail size={16} />
          </span>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            className="pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="password">Password</Label>
          {!isRegister && (
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('switch-auth-method', { detail: 'otp' }))}
              className="text-xs text-anarc-teal hover:underline"
            >
              Forgot password?
            </button>
          )}
        </div>
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-400">
            <Lock size={16} />
          </span>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="pl-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            {isRegister ? "Creating account..." : "Signing in..."}
          </>
        ) : (
          <>
            {isRegister ? "Create account" : "Sign in"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
};

export default EmailPasswordAuth;
