
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, ClipboardCheck, FileText, Users } from "lucide-react";
import NavBar from "@/components/NavBar";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 anarc-gradient text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            ANARC Examination Portal
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90 animate-slide-up">
            Register for the NIT Agartala Robotics Club's official examinations and kickstart your journey into robotics.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up">
            <Link to="/register">
              <Button size="lg" className="bg-white text-anarc-blue hover:bg-white/90">
                Let's Go
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-anarc-blue">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="h-16 w-16 bg-anarc-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClipboardCheck className="h-8 w-8 text-anarc-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-anarc-blue">Register</h3>
              <p className="text-gray-600">
                Fill out the registration form with your details to get started.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="h-16 w-16 bg-anarc-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-anarc-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-anarc-blue">Get Verified</h3>
              <p className="text-gray-600">
                Our admin team will verify your details and approve your registration.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="h-16 w-16 bg-anarc-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-anarc-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-anarc-blue">Download Admit Card</h3>
              <p className="text-gray-600">
                Once approved, access and download your official exam admit card.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="h-16 w-16 bg-anarc-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-anarc-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-anarc-blue">Attend Exam</h3>
              <p className="text-gray-600">
                Show up with your admit card on the exam day and showcase your skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Exams Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-anarc-blue">
            Upcoming Examinations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Exam 1 */}
            <div className="border rounded-xl overflow-hidden shadow-sm">
              <div className="h-48 bg-anarc-blue p-6 text-white flex flex-col justify-between">
                <div>
                  <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">Entry Level</span>
                  <h3 className="text-xl font-bold mt-3">SOAR 13.0  Test</h3>
                  <p className="mt-2 text-white/80">
                    Qualify for the next stage by showcasing your technical and club knowledge.</p>
                </div>
                <div className="flex items-center text-white/90">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">March 22, 2025</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>Duration: 1 hours</span>
                  <span>Max Score: 40</span>
                </div>
                <Link to="/register">
                  <Button className="w-full bg-anarc-teal hover:bg-anarc-teal/90">
                    Register Now
                  </Button>
                </Link>
              </div>
            </div>

            {/* Exam 2 */}
            <div className="border rounded-xl overflow-hidden shadow-sm">
              <div className="h-48 bg-anarc-teal p-6 text-white flex flex-col justify-between">
                <div>
                  <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">Intermediate</span>
                  <h3 className="text-xl font-bold mt-3">Arduino Development</h3>
                  <p className="mt-2 text-white/80">Showcase your Arduino programming and project skills.</p>
                </div>
                <div className="flex items-center text-white/90">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">July 10, 2023</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>Duration: 3 hours</span>
                  <span>Max Score: 100</span>
                </div>
                <Link to="#">
                  <Button className="w-full bg-anarc-teal hover:bg-anarc-teal/90" disabled={true}>
                    Register Now
                  </Button>
                </Link>
              </div>
            </div>

            {/* Exam 3 */}
            <div className="border rounded-xl overflow-hidden shadow-sm">
              <div className="h-48 bg-anarc-orange p-6 text-white flex flex-col justify-between">
                <div>
                  <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">Advanced</span>
                  <h3 className="text-xl font-bold mt-3">IoT Systems Design</h3>
                  <p className="mt-2 text-white/80">Advanced examination for IoT integration with robotics.</p>
                </div>
                <div className="flex items-center text-white/90">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">July 22, 2023</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>Duration: 4 hours</span>
                  <span>Max Score: 100</span>
                </div>
                <Link to="#">
                  <Button disabled={true} className="w-full bg-anarc-teal hover:bg-anarc-teal/90">
                    Register Now
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-anarc-blue text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">SOAR 13.0 – Your Gateway to Robotics Club!</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join hundreds of students from NIT Agartala in showcasing your talents and knowledge in robotics.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-anarc-blue hover:bg-white/90">
              Register for SOAR 13.0
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
       <footer className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="flex items-center gap-3">
                <img src="/assets/logo_black.png" alt="ANARC Logo" className="h-10 w-10" />
                <div className="bg-black text-white px-3 py-1 rounded-full text-sm">
                  EXAM PORTAL
                </div>
              </Link>
              <p className="mt-2 text-gray-600 max-w-md">
                Official examination portal for ANARC - The Robotics Club of NIT Agartala
              </p>
            </div>

            <div className="hidden md:grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-gray-600 hover:text-anarc-teal">Home</Link></li>
                  <li><Link to="/about" className="text-gray-600 hover:text-anarc-teal">About</Link></li>
                  <li><Link to="/exams" className="text-gray-600 hover:text-anarc-teal">Exams</Link></li>
                  <li><Link to="/contact" className="text-gray-600 hover:text-anarc-teal">Contact</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Information</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-anarc-teal">FAQs</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-anarc-teal">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-anarc-teal">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-anarc-teal">Help & Support</a></li>
                </ul>
              </div>

              <div className="col-span-2 md:col-span-1">
                <h3 className="font-semibold text-gray-900 mb-3">Contact</h3>
                <ul className="space-y-2">
                  <li className="text-gray-600">NIT Agartala, Tripura</li>
                  <li className="text-gray-600">anarc.nita.robotics@gmail.com</li>
                  <li className="text-gray-600">+91 9832776728</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-10 pt-6 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} ANARC – ROBOTICS CLUB, NIT AGARTALA  | DEVLOPED BY : <span style={{ color: 'black', cursor: 'pointer',fontWeight:700 }} onClick={()=>{window.location.href = 'https://www.instagram.com/aman_is_loading/','_blank' }}>AMAN MISHRA</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
