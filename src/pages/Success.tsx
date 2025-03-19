import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Loader2, CheckCircle2 } from "lucide-react";
const Success = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full max-w-xl mx-auto p-8 m-40 bg-white rounded-xl shadow-lg text-center">
            <div className="animate-fade-in">
                <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification Complete!</h2>
                <p className="text-gray-600 mb-6">
                    Your account has been created successfully. Now, you can log in and start using all the features.
                </p>
                <Button
                    className="bg-anarc-teal hover:bg-anarc-teal/90"
                    onClick={() => navigate("/login")}
                >
                    Go to Login
                </Button>
            </div>
        </div>
    )
};

export default Success
