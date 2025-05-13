
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, User, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-sm py-4 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-brand-purple" />
          <span className="text-xl font-bold text-gray-800">EventHub</span>
        </Link>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex items-center max-w-md w-full mx-4 relative">
          <Input
            type="search"
            placeholder="Search events..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pr-10"
          />
          <Search className="absolute right-3 h-4 w-4 text-gray-400" />
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/events"
            className="text-gray-600 hover:text-brand-purple transition-colors"
          >
            Events
          </Link>
          <Link
            to="/branches"
            className="text-gray-600 hover:text-brand-purple transition-colors"
          >
            Branches
          </Link>
          <Link to="/login">
            <Button variant="outline" className="flex items-center gap-2">
              <User size={18} />
              Login
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 px-4">
          <div className="relative mb-4">
            <Input
              type="search"
              placeholder="Search events..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pr-10 w-full"
            />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <div className="flex flex-col space-y-3">
            <Link
              to="/events"
              className="text-gray-600 hover:text-brand-purple transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Events
            </Link>
            <Link
              to="/branches"
              className="text-gray-600 hover:text-brand-purple transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Branches
            </Link>
            <Link
              to="/login"
              className="py-2"
              onClick={() => setIsOpen(false)}
            >
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <User size={18} />
                Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
