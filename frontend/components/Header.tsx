'use client'
import React, { useState, useEffect, useRef } from 'react';
import '@/styles/Header.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/auth/hooks';
import { auth, provider, signInWithPopup } from "../app/firebase";
import Image from 'next/image'
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button'
import {Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const Header = ({ placeholder = false }: { placeholder?: boolean }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false)
  const { user, setIsAuthenticated, setUser, axiosInstance } = useAuth();
  const router = useRouter();

  // fetching user info 
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        setIsUserLoading(true)
        const response = await axiosInstance.get("/api/auth/getUserInfo")
        setUser(response.data)
      } catch (error) {
        console.log(error)
      }
      finally { 
        setIsUserLoading(false)
      }
    }
    getCurrentUser()
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      <header className='px-5 bg-transparent absolute left-0 top-0 right-0 z-20'>
        <nav className="navbar flex justify-between items-center py-3">
          <div 
            className="logo-container"
          >
            <Link href="/" className="logo text-2xl font-bold text-white">Eventify</Link>
          </div>

          <div className="nav-links flex justify-evenly">
            <Link href="/" className='text-white'>Home</Link>
            <Link href="/allevent" className='text-white'>Events</Link>
            <Link href="#" className='text-white'>About</Link>
            <Link href="/contact" className='text-white'>Contact</Link>
          </div>

          <div className="relative">
            {user ? (
              <>
                <div>
                  <button
                    onClick={() => setOpen(!open)}
                    className="focus:outline-none"
                  >
                    <Avatar>
                      <AvatarImage src={user?.imageUrl || "/api/placeholder/40/40"} alt="Profile Picture" />
                      <AvatarFallback>
                        {user?.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </div>
              </>
            ) : (
              <div className='fc gap-3'>
                <Link
                  className='px-3 py-2 button-sec font-extrabold text-white'
                  href='/login'
                >
                  <Button 
                    variant={'outline'} 
                    className={`${placeholder ? 'bg-black' : 'bg-transparent'} hover:text-white rounded-full px-8`}
                    disabled={isUserLoading}
                  >
                    Login
                  </Button>
                </Link>
              </div>
            )}

            {open && (
              <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {user && (user.role === 'admin' || user.role === 'club') && (
                  <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleDashboardClick}>
                    Dashboard
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm w-full text-left text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>
      {placeholder && <div className='w-100 h-24 bg-[#100c0c] mb-2'></div>}
    </>
  );
};

export default Header;