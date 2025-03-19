import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import NavBar from '@/components/NavBar';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const handleResetPassword = async () => {
        if (!newPassword) {
            toast.error("Please enter a new password");
            return;
        }

        setIsLoading(true);
        try {
            const { error } = await supabase.auth.updateUser({
                password: newPassword,
            });

            if (error) throw error;

            toast.success("Password reset successful! Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
        } catch (error: any) {
            toast.error(error.message || "Failed to reset password");
            console.error("Reset password error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <NavBar />
            <div className="min-h-screen flex items-center justify-center bg-gray-50">

                <Card className="w-full max-w-md shadow-lg">
                    <CardHeader className="text-center bg-anarc-blue text-white rounded-t-lg">
                        <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">New Password</label>
                            <Input
                                type="password"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <Button
                            onClick={handleResetPassword}
                            disabled={isLoading}
                            className="w-full bg-anarc-teal text-white"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                    Resetting...
                                </>
                            ) : (
                                "Reset Password"
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default ResetPassword;
