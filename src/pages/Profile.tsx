
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Loader2, User, Mail, Phone, BookOpen, School, Hash, Save, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface StudentProfile {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  department: string | null;
  semester: string | null;
  roll_number: string | null;
  created_at: string;
  updated_at: string;
}

const Profile = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<StudentProfile>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('students')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) {
          throw error;
        }
        
        setProfile(data as StudentProfile);
        setFormData(data as StudentProfile);
      } catch (error: any) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    if (!user || !profile) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('students')
        .update({
          name: formData.name,
          phone: formData.phone,
          department: formData.department,
          semester: formData.semester,
          roll_number: formData.roll_number,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) {
        throw error;
      }
      
      setProfile(prev => ({ ...prev!, ...formData } as StudentProfile));
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-anarc-teal" />
            <h2 className="text-lg font-medium">Loading your profile...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Profile Not Found</CardTitle>
              <CardDescription>
                Your profile could not be loaded or does not exist.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => navigate('/dashboard')}>
                Return to Dashboard
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-anarc-blue mb-6">Your Profile</h1>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile Information</TabsTrigger>
              <TabsTrigger value="settings">Account Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader className="bg-anarc-blue/5 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-anarc-blue" />
                    Student Profile
                  </CardTitle>
                  <CardDescription>
                    View and manage your personal information
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-6">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="name"
                              name="name"
                              value={formData.name || ''}
                              onChange={handleInputChange}
                              className="pl-10"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="email"
                              value={profile.email}
                              readOnly
                              disabled
                              className="pl-10 bg-gray-50"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="phone"
                              name="phone"
                              value={formData.phone || ''}
                              onChange={handleInputChange}
                              className="pl-10"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="roll_number">Roll Number</Label>
                          <div className="relative">
                            <Hash className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="roll_number"
                              name="roll_number"
                              value={formData.roll_number || ''}
                              onChange={handleInputChange}
                              className="pl-10"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <div className="relative">
                            <School className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="department"
                              name="department"
                              value={formData.department || ''}
                              onChange={handleInputChange}
                              className="pl-10"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="semester">Semester</Label>
                          <div className="relative">
                            <BookOpen className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="semester"
                              name="semester"
                              value={formData.semester || ''}
                              onChange={handleInputChange}
                              className="pl-10"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                          <p className="mt-1 flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            {profile.name}
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Email</h3>
                          <p className="mt-1 flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            {profile.email}
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                          <p className="mt-1 flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            {profile.phone || 'Not provided'}
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Roll Number</h3>
                          <p className="mt-1 flex items-center gap-2">
                            <Hash className="h-4 w-4 text-gray-400" />
                            {profile.roll_number || 'Not provided'}
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Department</h3>
                          <p className="mt-1 flex items-center gap-2">
                            <School className="h-4 w-4 text-gray-400" />
                            {profile.department || 'Not provided'}
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Semester</h3>
                          <p className="mt-1 flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-gray-400" />
                            {profile.semester || 'Not provided'}
                          </p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-gray-500">
                          Account created on {new Date(profile.created_at).toLocaleDateString()}
                        </div>
                        <div className="text-gray-500">
                          Last updated: {new Date(profile.updated_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                
                <CardFooter className="flex justify-end gap-4 pt-6">
                  {isEditing ? (
                    <>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setFormData(profile);
                          setIsEditing(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="bg-anarc-teal hover:bg-anarc-teal/90"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </>
                  ) : (
                    <Button 
                      onClick={() => setIsEditing(true)}
                      className="bg-anarc-blue hover:bg-anarc-blue/90"
                    >
                      Edit Profile
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader className="bg-anarc-blue/5 rounded-t-lg">
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account preferences and security
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <h3 className="font-medium">Email Verified</h3>
                        <p className="text-sm text-gray-500">
                          Your email address has been verified.
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Password</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        You can reset your password if needed
                      </p>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          // Just navigate to the reset-password screen
                          // We could also implement a direct reset flow here
                          navigate('/login');
                          toast.info("Use the 'Reset' tab to reset your password");
                        }}
                      >
                        Reset Password
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <footer className="mt-auto py-6 bg-gray-100">
        <div className="container mx-auto text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()}ANARC – ROBOTICS CLUB, NIT AGARTALA | INNOVATE. BUILD. EXCEL.
        </div>
      </footer>
    </div>
  );
};

export default Profile;
