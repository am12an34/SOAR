
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Award, FileText, ArrowRight } from 'lucide-react';

const Exams = () => {
  // Mock data for exams
  const exams = [
    {
      id: 1,
      title: "SOAR 13.0  Test",
      description: "Qualify for the next stage by showcasing your technical and club knowledge.",
      level: "Beginner",
      date: "March 22, 2025",
      time: "12:30 PM - 1:30 PM",
      duration: "1 hours",
      fee: "₹0",
      badge: "Popular"
    },
    {
      id: 2,
      title: "Arduino Development",
      description: "Comprehensive examination on Arduino programming and project development",
      level: "Intermediate",
      date: "September 5, 2023",
      time: "2:00 PM - 5:00 PM",
      duration: "3 hours",
      fee: "₹0",
      badge: null
    },
    {
      id: 3,
      title: "Advanced Robotics",
      description: "Advanced topics in robotics including AI, machine learning, and computer vision",
      level: "Advanced",
      date: "October 10, 2023",
      time: "9:00 AM - 1:00 PM",
      duration: "4 hours",
      fee: "₹0",
      badge: "Advanced"
    },
    {
      id: 4,
      title: "IoT Systems",
      description: "Internet of Things architecture, protocols, and implementation",
      level: "Intermediate",
      date: "November 15, 2023",
      time: "10:00 AM - 1:00 PM",
      duration: "3 hours",
      fee: "0",
      badge: null
    },
    {
      id: 5,
      title: "Robotics Competition Prep",
      description: "Preparation for national robotics competitions with focus on strategy and execution",
      level: "Advanced",
      date: "December 5, 2023",
      time: "10:00 AM - 2:00 PM",
      duration: "4 hours",
      fee: "₹0",
      badge: "New"
    },
    {
      id: 6,
      title: "Programming for Robotics",
      description: "Specialized programming concepts for robot control and automation",
      level: "Intermediate",
      date: "January 10, 2024",
      time: "1:00 PM - 4:00 PM",
      duration: "3 hours",
      fee: "₹0",
      badge: null
    }
  ];

  // Function to get badge color based on level
  const getBadgeColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-blue-100 text-blue-800";
      case "Advanced":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  useEffect(()=>{
    
  })

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      <div className="flex-1 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-anarc-blue mb-4">
              ANARC Examination Program
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Explore our range of examinations designed to test and certify your skills in robotics, 
              programming, and electronic systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {exams.map((exam) => (
              <Card key={exam.id} className="shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
                <CardHeader className={`rounded-t-lg ${
                  exam.id % 2 === 0 ? 'bg-anarc-teal/5' : 'bg-anarc-blue/5'
                }`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${getBadgeColor(exam.level)}`}>
                        {exam.level}
                      </span>
                      <CardTitle className={exam.id % 2 === 0 ? 'text-anarc-teal' : 'text-anarc-blue'}>
                        {exam.title}
                      </CardTitle>
                    </div>
                    {exam.badge && (
                      <span className="bg-anarc-blue text-white text-xs px-2 py-1 rounded-full">
                        {exam.badge}
                      </span>
                    )}
                  </div>
                  <CardDescription className="text-gray-600">
                    {exam.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-anarc-teal" />
                      <span>Date: {exam.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-anarc-teal" />
                      <span>Time: {exam.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Award className="h-4 w-4 mr-2 text-anarc-teal" />
                      <span>Duration: {exam.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FileText className="h-4 w-4 mr-2 text-anarc-teal" />
                      <span>Fee: {exam.fee}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-6 py-4 bg-gray-50 rounded-b-lg">
                  <Link to={exam.id===1?'/register':'#'} className="w-full">
                    <Button className="w-full bg-anarc-blue hover:bg-anarc-blue/90" disabled={exam.id===1?false:true}>
                      Register for Exam
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card className="shadow-md mb-12">
            <CardHeader className="bg-anarc-blue/5 rounded-t-lg">
              <CardTitle className="text-anarc-blue">Examination Process</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ol className="list-decimal list-inside space-y-4 text-gray-600">
                <li className="pl-2">
                  <span className="font-medium text-anarc-blue">Registration</span>: Select your preferred examination and register through our portal.
                </li>
                <li className="pl-2">
                  <span className="font-medium text-anarc-blue">Payment</span>: Complete the registration fee payment. Most of the cases its free!
                </li>
                <li className="pl-2">
                  <span className="font-medium text-anarc-blue">Confirmation</span>: Receive a confirmation email with your registration details.
                </li>
                <li className="pl-2">
                  <span className="font-medium text-anarc-blue">Admit Card</span>: Download your admit card from your dashboard 3 days prior to the examination.
                </li>
                <li className="pl-2">
                  <span className="font-medium text-anarc-blue">Examination</span>: Attend the examination at the specified venue with your admit card and valid ID.
                </li>
                <li className="pl-2">
                  <span className="font-medium text-anarc-blue">Results</span>: Results will be announced within 2 weeks of the examination.
                </li>
                <li className="pl-2">
                  <span className="font-medium text-anarc-blue">Certificate</span>: Successful candidates will receive a digital certificate.
                </li>
              </ol>
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

export default Exams;
