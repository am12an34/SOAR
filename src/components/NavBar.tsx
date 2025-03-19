import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, ChevronDown, User, LayoutDashboard, LogOut } from "lucide-react";

const NavBar = () => {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="bg-anarc-blue py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/assets/logo.png" alt="ANARC Logo" className="h-10 w-10" />
          <div className="bg-black text-white px-3 py-1 rounded-full text-sm">
            EXAM PORTAL
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Menu Items */}
        <div
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-anarc-blue md:bg-transparent md:flex items-center md:space-x-6 text-white p-4 md:p-0 ${menuOpen ? "block" : "hidden"}`}
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

        {/* User area */}
        {/* User area */}
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
    </nav>
  );
};

export default NavBar;
