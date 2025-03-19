
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AuthForm from '@/components/auth/AuthForm';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center bg-anarc-blue text-white rounded-t-lg pb-6">
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <CardDescription className="text-gray-200">
              Access your ANARC examination account
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <AuthForm />
            
            <div className="mt-6 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/register" className="text-anarc-teal font-medium hover:underline">
                Register now
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <footer className="py-6 bg-gray-100">
        <div className="container mx-auto text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()}ANARC – ROBOTICS CLUB, NIT AGARTALA | INNOVATE. BUILD. EXCEL.
        </div>
      </footer>
    </div>
  );
};

export default Login;
