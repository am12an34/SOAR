
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import RegistrationForm from '@/components/RegistrationForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader className="text-center bg-anarc-blue text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold">Examination Registration</CardTitle>
            <CardDescription className="text-gray-200">
              Fill out this form to register for upcoming ANARC examinations
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <RegistrationForm />
            
            <div className="mt-6 text-center text-sm text-gray-500">
              Already registered?{" "}
              <Link to="/login" className="text-anarc-teal font-medium hover:underline">
                Sign in to your account
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <footer className="py-6 bg-gray-100">
        <div className="container mx-auto text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ANARC – ROBOTICS CLUB, NIT AGARTALA | INNOVATE. BUILD. EXCEL.
        </div>
      </footer>
    </div>
  );
};

export default Register;
