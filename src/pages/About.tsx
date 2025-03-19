
import React from 'react';
import NavBar from '@/components/NavBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Award, Users, Code } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      <div className="flex-1 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-anarc-blue mb-6 text-center">
            About ANARC Robotics Club
          </h1>
          <p className="text-gray-600 text-lg mb-12 text-center">
            Empowering future innovators through robotics education and examination
          </p>

          <Card className="mb-10 shadow-md">
            <CardHeader className="bg-anarc-blue/5 rounded-t-lg">
              <CardTitle className="text-anarc-blue">Our Mission</CardTitle>
              <CardDescription>
                Fostering innovation and technical excellence in robotics
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">
                ANARC (Asimov NIT Agartala Robotics Club) is the premier robotics club of NIT Agartala, 
                dedicated to advancing robotics education, research, and innovation among students. 
                Our examination system identifies and nurtures talent across various domains of robotics and 
                automation engineering.
              </p>
              <p className="text-gray-600">
                Founded in 2015, ANARC has grown to become one of the most prestigious technical clubs in the region, 
                with alumni working in leading technology companies and research institutions across the globe.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="shadow-md h-full">
              <CardHeader className="bg-anarc-teal/5 rounded-t-lg">
                <div className="flex items-center">
                  <Book className="h-6 w-6 text-anarc-teal mr-2" />
                  <CardTitle className="text-anarc-teal">Education</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600">
                  ANARC conducts regular workshops, seminars, and hands-on training sessions 
                  in robotics, electronics, programming, and mechanical design. Our examination 
                  system provides a structured approach to learning and skill assessment.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md h-full">
              <CardHeader className="bg-anarc-blue/5 rounded-t-lg">
                <div className="flex items-center">
                  <Award className="h-6 w-6 text-anarc-blue mr-2" />
                  <CardTitle className="text-anarc-blue">Competitions</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600">
                  We organize and participate in various national and international robotics 
                  competitions. Our members have won accolades in events like Robocon, 
                  e-Yantra, and various IIT techfests.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md h-full">
              <CardHeader className="bg-anarc-blue/5 rounded-t-lg">
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-anarc-blue mr-2" />
                  <CardTitle className="text-anarc-blue">Community</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600">
                  ANARC fosters a vibrant community of robotics enthusiasts who collaborate, 
                  learn, and grow together. Our alumni network provides mentorship and career 
                  guidance to current members.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md h-full">
              <CardHeader className="bg-anarc-teal/5 rounded-t-lg">
                <div className="flex items-center">
                  <Code className="h-6 w-6 text-anarc-teal mr-2" />
                  <CardTitle className="text-anarc-teal">Innovation</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600">
                  We encourage innovative thinking and problem-solving through project-based 
                  learning. Our members work on real-world applications of robotics in 
                  healthcare, agriculture, and sustainable development.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-md mb-12">
            <CardHeader className="bg-anarc-blue/5 rounded-t-lg">
              <CardTitle className="text-anarc-blue">Examination System</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">
                Our examination system is designed to assess and certify students' knowledge 
                and skills in various domains of robotics. These certifications are recognized 
                by leading companies and institutions, providing a competitive edge to our 
                students in their careers.
              </p>
              <p className="text-gray-600">
                The exams are conducted in a transparent and fair manner, with a focus on 
                practical skills and theoretical knowledge. Students can register for exams 
                through this portal and download their admit cards once approved.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <footer className="py-6 bg-gray-100">
        <div className="container mx-auto text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ANARC – ROBOTICS CLUB, NIT AGARTALA | INNOVATE. BUILD. EXCEL.
        </div>
      </footer>
    </div>
  );
};

export default About;
