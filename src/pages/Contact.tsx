
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Message Recived!",
      description: "We'll get back to you as soon as possible.",
    });
    
    // Reset form
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      <div className="flex-1 container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-anarc-blue mb-6 text-center">
            Contact Us
          </h1>
          <p className="text-gray-600 text-lg mb-12 text-center max-w-3xl mx-auto">
            Have questions about our examination program or need assistance? 
            We're here to help. Reach out to us using the form below or through our contact details.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <Card className="shadow-md h-full">
              <CardHeader className="bg-anarc-blue/5 rounded-t-lg">
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-anarc-blue mr-2" />
                  <CardTitle className="text-anarc-blue">Email</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-2">General Inquiries:</p>
                <a href="mailto:anarc.nita.robotics@gmail.com" className="text-anarc-teal hover:underline">
                  anarc.nita.robotics@gmail.com
                </a>
                
                <p className="text-gray-600 mt-4 mb-2">Examination Support:</p>
                <a href="mailto:soar.anarc.nita@gmail.com" className="text-anarc-teal hover:underline">
                soar.anarc.nita@gmail.com
                </a>
              </CardContent>
            </Card>

            <Card className="shadow-md h-full">
              <CardHeader className="bg-anarc-teal/5 rounded-t-lg">
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-anarc-teal mr-2" />
                  <CardTitle className="text-anarc-teal">Phone</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-2">Main Office:</p>
                <p className="text-anarc-blue font-medium">+91 7007968049</p>
                
                <p className="text-gray-600 mt-4 mb-2">Technical Support:</p>
                <p className="text-anarc-blue font-medium">+91 9832776728</p>
                
                <p className="text-gray-600 mt-4 mb-2">Office Hours:</p>
                <p className="text-gray-700">Monday to Friday: 9 AM - 5 PM</p>
              </CardContent>
            </Card>

            <Card className="shadow-md h-full">
              <CardHeader className="bg-anarc-blue/5 rounded-t-lg">
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-anarc-blue mr-2" />
                  <CardTitle className="text-anarc-blue">Address</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-2">ANARC ROOM (GF)</p>
                <p className="text-gray-700">SAC, NIT Agartala</p>
                <p className="text-gray-700">National Institute of Technology</p>
                <p className="text-gray-700">Agartala, Tripura - 799046</p>
                <p className="text-gray-700">India</p>
                
                <a 
                  href="https://maps.google.com/?q=NIT+Agartala+sac+BUILDING" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-anarc-teal hover:underline"
                >
                  View on Google Maps
                </a>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-md mb-12">
            <CardHeader className="bg-anarc-blue text-white rounded-t-lg">
              <CardTitle>Send Us a Message</CardTitle>
              <CardDescription className="text-gray-200">
                Fill out the form below and we'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Your Name
                    </label>
                    <Input 
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <Input 
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <Input 
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <Textarea 
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please describe your query in detail..."
                    rows={5}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-anarc-teal hover:bg-anarc-teal/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader className="bg-anarc-teal/5 rounded-t-lg">
              <CardTitle className="text-anarc-teal">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-anarc-blue mb-2">How do I register for an examination?</h3>
                  <p className="text-gray-600">
                    You can register for any examination through our Exams page. Select the exam you're interested in,
                    click on "Register for Exam", and follow the registration process.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-anarc-blue mb-2">When will I receive my admit card?</h3>
                  <p className="text-gray-600">
                    Admit cards are typically made available for download 2 days before the examination date.
                    You can access your admit card from your dashboard after logging in.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-anarc-blue mb-2">What if I need to reschedule my examination?</h3>
                  <p className="text-gray-600">
                    Please contact our examination support team at exams@anarc.nita.ac.in at least 5 days prior to 
                    your scheduled examination date to discuss rescheduling options.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-anarc-blue mb-2">How will I receive my results and certificate?</h3>
                  <p className="text-gray-600">
                    Results will be announced within 2 weeks of the examination. You will receive an email notification,
                    and the results will also be available on your dashboard. Digital certificates will be issued to 
                    successful candidates.
                  </p>
                </div>
              </div>
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

export default Contact;
