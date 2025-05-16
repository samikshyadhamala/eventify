'use client'
import React, { useState, useEffect, useRef } from 'react';
import '@/styles/Header.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/auth/hooks';
import { auth, provider, signInWithPopup } from "../app/firebase";
import Image from 'next/image'
import { toast } from 'react-toastify';

const Header = ({ placeholder = false }: { placeholder?: boolean }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, setIsAuthenticated, setUser, axiosInstance } = useAuth();
  const router = useRouter();

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

  const handleLoginOrSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      const idToken = await firebaseUser.getIdToken();
      const refreshToken = firebaseUser.refreshToken;

      try {
        const response = await axiosInstance.post(
          '/api/auth/signin-with-google',
          { authToken: idToken, refreshToken }
        );
        setIsAuthenticated(true);
        setUser(response.data?.user);
        if (response.data?.user?.role === 'club') {
          router.push('/club');
        } else {
          router.push('/');
        }
      } catch (error) {
        toast.error("Error during login")
        console.error('Login error:', error);
      }
    } catch (err) {
      toast.error("Google login error")
      console.error('Google login error:', err);
    }
  };

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

  return (
    <>
      <header className='px-5 bg-transparent absolute left-0 top-0 right-0 z-20'>
        <nav className="navbar flex justify-between items-center py-3">
          <div className="logo-container">
            <a href="#" className="logo text-2xl font-bold text-white">Eventify</a>
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
                <button
                  onClick={() => setOpen(!open)}
                  className="w-30 h-30 rounded-full overflow-hidden border-2 border-gray-300 focus:outline-none"
                >
                  <Image
                    src={user?.imageUrl || "/api/placeholder/40/40"}
                    alt="Profile Picture"
                    className="object-cover"
                    height={32}
                    width={32}
                  />
                </button>
              </>
            ) : (
              <div className='fc gap-3'>
                <button
                  onClick={handleLoginOrSignup}
                  className='px-3 py-2 button-sec font-extrabold'
                >
                  Login
                </button>
                <button
                  onClick={handleLoginOrSignup}
                  className='px-3 py-2 button-pri'
                >
                  Sign Up
                </button>
              </div>
            )}

            {open && (
              <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
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