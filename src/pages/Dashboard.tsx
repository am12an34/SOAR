import { supabase } from "@/integrations/supabase/client";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Calendar, FileText, AlertCircle } from 'lucide-react';
import { downloadAdmitCard } from '@/utils/admitCardGenerator';
import { useToast } from '@/components/ui/use-toast';

interface StudentData {
  name: string;
  regNo: string;
  email: string;
  phone?: string;
  department?: string;
  semester?: string;
  rollNumber?: string;
  examType?: string;
  examName: string;
  examDate: string;
  examTime: string;
  venue: string;
  hasAdmitCard: boolean;
  registrationDate?: string;
  status?: string;
}

const Dashboard = () => {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchStudentData = async () => {
      const storedData = localStorage.getItem("sb-ywtgdbsxstcilwaedgme-auth-token");
  
      if (!storedData) {
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "Please login to access the dashboard.",
        });
        return;
      }
  
      try {
        const parsedData = JSON.parse(storedData);
  
        if (!parsedData.user || !parsedData.user.user_metadata) {
          throw new Error("User metadata is missing.");
        }
  
        const userMeta = parsedData.user.user_metadata;
        const userId = parsedData.user.id; // Extracting user ID
  
        // Fetch student status from Supabase
        const { data: registration, error } = await supabase
          .from("registrations")
          .select("status, registration_date")
          .eq("student_id", userId)
          .single(); // Assuming one registration per student
  
        if (error) {
          throw new Error("Failed to fetch registration data.");
        }
  
        // Map user metadata to student dashboard format
        const mappedData: StudentData = {
          name: userMeta.name || "Unknown",
          regNo: userMeta.roll_number || "Not Assigned",
          email: userMeta.email || "No Email",
          phone: userMeta.phone || "No Phone",
          department: userMeta.department || "No Department",
          semester: userMeta.semester || "N/A",
          rollNumber: userMeta.roll_number || "No Roll Number",
          examType: parsedData.examType || "Unknown",
          examName: getExamName(parsedData.examType) || "No Exam",
          examDate: "MARCH 22, 2025", // Ideally fetched from backend
          examTime: "12:00 PM - 1:00 PM", // Ideally fetched from backend
          venue: "CIVIL DEPARTMENT , NITA", // Ideally fetched from backend
          hasAdmitCard: registration?.status === "Approved",
          registrationDate: registration?.registration_date || new Date().toISOString(),
          status: registration?.status || "Pending",
        };
        setStudentData(mappedData);
      } catch (error) {
        console.error("Error parsing student data:", error);
        toast({
          variant: "destructive",
          title: "Data error",
          description: "There was a problem loading your information.",
        });
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchStudentData();
  }, [navigate, toast]);
  
  
  const getExamName = (examType?: string): string => {
    if (!examType) return "SOAR 13.O EXAMINATION";
    
    const examNames: Record<string, string> = {
      "SOAR13.0": "SOAR 13.O EXAMINATION",
    };
    
    return examNames[examType] || "ANARC Examination";
  };

  const handleDownloadAdmitCard = () => {
    if (!studentData) return;
    
    if (studentData.hasAdmitCard) {
      downloadAdmitCard(studentData);
      
      toast({
        title: "Admit Card Downloaded",
        description: "Your admit card has been downloaded successfully.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Admit Card Not Available",
        description: "Your admit card is not yet available for download.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-anarc-blue mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
            <h2 className="mt-4 text-xl font-bold text-gray-800">Error Loading Data</h2>
            <p className="mt-2 text-gray-600">Unable to load your information. Please try again later.</p>
            <Button 
              onClick={() => navigate('/login')} 
              className="mt-6 bg-anarc-blue hover:bg-anarc-blue/90"
            >
              Return to Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-anarc-blue">STUDENT DASHBOARD</h1>
          <p className="text-gray-600">👋 Hi, {studentData.name}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Student Information Card */}
          <Card className="shadow-sm">
            <CardHeader className="bg-anarc-blue/5 rounded-t-lg">
              <CardTitle className="text-anarc-blue">Student Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Registration ID:</span>
                  <span className="font-medium">{`ANARC25${studentData.regNo.slice(0, 2).toUpperCase()}${studentData.regNo.slice(2, 5).toUpperCase()}${studentData.regNo.slice(-2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Name:</span>
                  <span className="font-medium">{studentData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Email:</span>
                  <span className="font-medium">{studentData.email}</span>
                </div>
                {studentData.phone && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Phone:</span>
                    <span className="font-medium">{studentData.phone}</span>
                  </div>
                )}
                {studentData.department && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Department:</span>
                    <span className="font-medium">{studentData.department}</span>
                  </div>
                )}
                {studentData.rollNumber && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Roll Number:</span>
                    <span className="font-medium">{studentData.rollNumber}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Exam Information Card */}
          <Card className="shadow-sm">
            <CardHeader className="bg-anarc-teal/5 rounded-t-lg">
              <CardTitle className="text-anarc-teal">Exam Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Exam:</span>
                  <span className="font-medium">{studentData.examName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Date:</span>
                  <span className="font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-anarc-teal" />
                    {studentData.examDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Time:</span>
                  <span className="font-medium">{studentData.examTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Venue:</span>
                  <span className="font-medium">{studentData.venue}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Status:</span>
                  <span
                    className={`font-medium px-3 py-1 rounded-lg ${studentData.status === "Approved" ? "bg-green-100 text-green-600" :
                        studentData.status === "Rejected" ? "bg-red-100 text-red-600" :
                          "bg-amber-100 text-amber-600"
                      }`}
                  >
                    {studentData.status}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Admit Card */}
          <Card className="shadow-sm">
            <CardHeader className={`${studentData.hasAdmitCard ? 'bg-green-50' : 'bg-amber-50'} rounded-t-lg`}>
              <CardTitle className={studentData.hasAdmitCard ? 'text-green-600' : 'text-amber-600'}>
                Admit Card
              </CardTitle>
              <CardDescription>
                {studentData.hasAdmitCard 
                  ? "Your admit card is ready to download" 
                  : "Your application is being processed"}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 pb-2 flex flex-col items-center">
              {studentData.hasAdmitCard ? (
                <>
                  <FileText className="h-16 w-16 text-green-500 mb-4" />
                  <p className="text-center text-gray-600 mb-4">
                    Download your admit card for the upcoming examination.
                  </p>
                </>
              ) : (
                <>
                  <AlertCircle className="h-16 w-16 text-amber-500 mb-4" />
                  <p className="text-center text-gray-600 mb-4">
                    Your application is under review. Admit card will be available once approved.
                  </p>
                </>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                disabled={!studentData.hasAdmitCard}
                variant={studentData.hasAdmitCard ? "default" : "outline"}
                onClick={handleDownloadAdmitCard}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Admit Card
              </Button>
            </CardFooter>
          </Card>
        </div>
        <hr />
      </div>
      
      <footer className="mt-auto py-6 bg-gray-100">
        <div className="container mx-auto text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ANARC – ROBOTICS CLUB, NIT AGARTALA | INNOVATE. BUILD. EXCEL.
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
