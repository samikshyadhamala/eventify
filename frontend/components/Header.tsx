'use client'
import React, { useState, useEffect, useRef } from 'react';
import '@/styles/Header.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/auth/hooks';
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Grid, LogOut, X, Menu } from 'lucide-react'
import { motion } from 'framer-motion'
import NavSearchBar from './NavSearchBar';

const Header = ({ placeholder = false }) => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const { user, setIsAuthenticated, setUser, axiosInstance } = useAuth();
  const router = useRouter();

  // Fetch user info on mount
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        setIsUserLoading(true);
        const response = await axiosInstance.get("/api/auth/getUserInfo");
        setUser(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsUserLoading(false);
      }
    };
    getCurrentUser();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [menuOpen]);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/api/auth/logout');
      setIsAuthenticated(false);
      setUser(null);
      router.push('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleDashboardClick = () => {
    if (!user) return;
    if (user.role === 'club') {
      router.push('/club');
    } else if (user.role === 'admin') {
      router.push('/admin');
    }
  };

  return (
    <>
      <header className="px-5 bg-transparent absolute left-0 top-0 right-0 z-50">
        <nav className="px-2 flex justify-evenly items-center py-4">
          {/* Logo */}
          <div className='flex items-center space-x-8'>
            <div className="logo-container">
              <Link href="/" className="logo text-2xl font-bold text-white">Eventify</Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:block">
              <NavSearchBar placeholder={placeholder}/>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex justify-center space-x-12 ">
            <Link href="/" className="text-white hover:underline hover:text-gray-300 !text-lg">Home</Link>
            <Link href="/allevent" className="text-white hover:underline hover:text-gray-300 !text-lg">Events</Link>
            <Link href="/contact" className="text-white hover:underline hover:text-gray-300 !text-lg">Contact</Link>
            {user?.role && (
              <Link href="/MyEvents" className='text-white !text-lg'>
                MyEvents
              </Link>
            )}
          </div>

          {/* Desktop User Section */}
          <div className="relative hidden md:block">
            {user ? (
              <>
                <button
                  onClick={() => setOpen(!open)}
                  className="focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={open}
                >
                  <Avatar>
                    <AvatarImage src={user?.imageUrl || "/api/placeholder/40/40"} alt="Profile Picture" />
                    <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                </button>
                {open && (
                  <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 overflow-hidden bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    {(user.role === 'admin' || user.role === 'club') && (
                      <button
                        className="flex items-center px-4 py-2 text-sm w-full text-left text-gray-700 hover:bg-gray-100"
                        onClick={handleDashboardClick}
                      >
                        <Grid className="h-5 w-5 mr-2" />
                        Dashboard
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 text-sm w-full text-left text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link href="/login">
                <Button
                  variant="outline"
                  className={`${placeholder ? 'bg-black' : 'bg-transparent'} hover:text-white text-white rounded-full px-8`}
                  disabled={isUserLoading}
                >
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Menu Button */}
          <div className="md:hidden absolute right-12 top-8">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <Menu />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu with Animation */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
        >
          <div className="bg-white h-full w-full p-5">
            <div className="flex justify-between items-center mb-10">
              <Link href="/" className="logo text-2xl font-bold text-black">Eventify</Link>
              <button onClick={() => setMenuOpen(false)} className="text-black" aria-label="Close menu">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-black text-lg py-2 border-b border-gray-200" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link href="/allevent" className="text-black text-lg py-2 border-b border-gray-200" onClick={() => setMenuOpen(false)}>Events</Link>
              <Link href="/contact" className="text-black text-lg py-2 border-b border-gray-200" onClick={() => setMenuOpen(false)}>Contact</Link>
              {user ? (
                <>
                  {(user.role === 'admin' || user.role === 'club') && (
                    <button
                      className="text-black text-lg py-2 border-b border-gray-200 text-left"
                      onClick={() => { handleDashboardClick(); setMenuOpen(false); }}
                    >
                      Dashboard
                    </button>
                  )}
                  <button
                    className="text-black text-lg py-2 border-b border-gray-200 text-left"
                    onClick={() => { handleLogout(); setMenuOpen(false); }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" className="text-black text-lg py-2 border-b border-gray-200" onClick={() => setMenuOpen(false)}>Login</Link>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {placeholder && <div className="w-100 h-24 bg-[#100c0c] mb-0"></div>}
    </>
  );
};

export default Header;