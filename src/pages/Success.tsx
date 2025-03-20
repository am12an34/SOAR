import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const Success = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full max-w-xl mx-auto p-8 m-40 bg-white rounded-xl shadow-lg text-center">
            <div className="animate-fade-in">
                <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
                <p className="text-gray-600 mb-6">
                    You have successfully registered for the <span className="font-semibold">SOAR13.O Examination</span>.  
                    Kindly verify your email and then login!
                </p>
                <Button
                    className="bg-anarc-teal hover:bg-anarc-teal/90"
                    onClick={() => navigate("/dashboard")}
                >
                    Go to Dashboard
                </Button>
            </div>
        </div>
    );
};

export default Success;
