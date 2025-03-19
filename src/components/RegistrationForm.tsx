import NavBar from '@/components/NavBar';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Define the form schema
const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().regex(/^\d{10}$/, {
    message: "Phone number must be 10 digits.",
  }),
  department: z.string({
    required_error: "Please select your department.",
  }),
  semester: z.string({
    required_error: "Please select your semester.",
  }),
  rollNumber: z.string().min(1, {
    message: "Roll number is required.",
  }),
  examType: z.string({
    required_error: "Please select an exam type.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string(),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const RegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signUp } = useAuth();

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      department: "",
      semester: "",
      rollNumber: "",
      examType: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  // Handle form submission
  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    try {
      // Sign up the user with Supabase Auth and create a student profile
      await signUp(data.email, data.password, {
        name: data.name,
        phone: data.phone,
        department: data.department,
        semester: data.semester,
        rollNumber: data.rollNumber,
      });
      
      setIsSuccess(true);
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }
  if ( isSubmitting) {
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
  if (isSuccess) {
    return (
      <div className="w-full max-w-xl mx-auto p-8 bg-white rounded-xl shadow-lg text-center">
        <div className="animate-fade-in">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your account has been created successfully. You will now be redirected to the login page.
          </p>
          <Button
            className="bg-anarc-teal hover:bg-anarc-teal/90"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }
  
  

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-anarc-blue mb-6">
        Exam Registration
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 animate-fade-in"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Aman Mishra" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="aman@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="9832776728" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rollNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enrollment Number</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g. 23UPE026" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Computer Science Engineering">Computer Science Engineering</SelectItem>
                      <SelectItem value="Electronics & Communication Engineering">Electronics & Communication Engineering</SelectItem>
                      <SelectItem value="Electronics & Instrumentation Engineering">Electronics & Instrumentation Engineering</SelectItem>
                      <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                      <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                      <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
                      <SelectItem value="Chemical Engineering">Chemical Engineering</SelectItem>
                      <SelectItem value="Production Engineering">Production Engineering</SelectItem>
                      <SelectItem value="Bio Engineering">Bio Engineering</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="semester"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Semester</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1st Semester</SelectItem>
                      <SelectItem value="2">2nd Semester</SelectItem>
                      <SelectItem value="3">3rd Semester</SelectItem>
                      <SelectItem value="4">4th Semester</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="examType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exam Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select exam type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="SOAR13.0">SOAR 13.0  '2025</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the exam you want to register for
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="agreeTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I agree to the terms and conditions
                  </FormLabel>
                  <FormDescription>
                    By checking this, you agree to our{" "}
                    <a
                      href="#"
                      className="text-anarc-teal underline hover:text-anarc-teal/80"
                    >
                      terms of service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-anarc-teal underline hover:text-anarc-teal/80"
                    >
                      privacy policy
                    </a>
                    .
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-anarc-teal hover:bg-anarc-teal/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegistrationForm;
