import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Home,
  FileText,
  Phone,
  Info,
  User,
  LayoutDashboard,
  LogOut,
  LogIn,
  UserPlus,
  Menu,
  ChevronDown,
  X
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const NavBar = () => {
  const { user, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Top Navigation Bar (Desktop & Mobile) */}
      <nav className="bg-anarc-blue py-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src="/assets/logo.png" alt="ANARC Logo" className="h-10 w-10" />
            <div className="bg-black text-white px-3 py-1 rounded-full text-sm">
              EXAM PORTAL
            </div>
          </Link>

          {/* Desktop Menu */}
          <div
            className={`absolute md:static top-16 left-0 w-full md:w-auto bg-anarc-blue md:bg-transparent md:flex items-center md:space-x-6 text-white p-4 md:p-0 ${mobileMenuOpen ? "block" : "hidden"}`}
          >
            <Button asChild variant="ghost" className="text-white ">
              <Link to="/about">ABOUT</Link>
            </Button>
            <Button asChild variant="ghost" className="text-white ">
              <Link to="/contact">CONTACT</Link>
            </Button>
            <Button asChild variant="ghost" className="text-white">
              <Link to="/exams">EXAMS</Link>
            </Button>
          </div>


          {/* User Dropdown */}
          <div className="flex items-center gap-4 relative">
                    {user ? (
                      <div className="relative">
                        <button
                          className="flex items-center text-white focus:outline-none"
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                          <User size={18} className="mr-2 text-white" />
                          <ChevronDown size={18} className="ml-1" />
                        </button>
                        {dropdownOpen && (
                          <div className="absolute right-0 mt-2 bg-white text-black shadow-md rounded-md w-40">
                            <Link to="/profile" className="flex items-center px-4 py-2 hover:bg-gray-200">
                              <User size={16} className="mr-2" /> Profile
                            </Link>
                            <Link to="/dashboard" className="flex items-center px-4 py-2 hover:bg-gray-200">
                              <LayoutDashboard size={16} className="mr-2" /> Dashboard
                            </Link>
                            <button
                              onClick={handleSignOut}
                              className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-200"
                            >
                              <LogOut size={16} className="mr-2" /> Sign Out
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <Button asChild variant="ghost" className="text-white">
                          <Link to="/login">SIGN IN</Link>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="text-anarc-blue border-white hover:bg-white hover:text-anarc-blue"
                        >
                          <Link to="/register">REGISTER</Link>
                        </Button>
                      </>
                    )}
                  </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden flex flex-col items-center bg-anarc-blue text-white py-4 space-y-3">
            <Link to="/about" className="hover:text-gray-300">ABOUT</Link>
            <Link to="/contact" className="hover:text-gray-300">CONTACT</Link>
            <Link to="/exams" className="hover:text-gray-300">EXAMS</Link>
          </div>
        )}
      </nav>

      {/* Bottom Navigation Bar (Only on Mobile) */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around py-3 md:hidden">
        <NavItem to="/" icon={<Home size={24} />} label="Home" />
        <NavItem to="/exams" icon={<FileText size={24} />} label="Exams" />
        <NavItem to="/contact" icon={<Phone size={24} />} label="Contact" />
        <NavItem to="/about" icon={<Info size={24} />} label="About" />
      </div>
    </>
  );
};

const NavItem = ({ to, icon, label }) => {
  return (
    <Link to={to} className="flex flex-col items-center text-gray-700">
      <div className="bg-gray-100 p-2 rounded-full shadow-md">{icon}</div>
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
};

export default NavBar;
