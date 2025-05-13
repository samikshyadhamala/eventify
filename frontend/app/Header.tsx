'use client'
import React, { useEffect, useRef, useState } from 'react';
import './Header.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/auth/hooks';
import { auth, provider, signInWithPopup } from './firebase';
import Image from 'next/image'

const Header = () => {
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
        console.error('Login error:', error);
      }
    } catch (err) {
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
    <header className='w-100 px-5'>
      <nav className="navbar flex justify-between items-center py-3">
        <div className="logo-container">
          <a href="#" className="logo text-2xl font-bold">Eventify</a>
        </div>

        <div className="search-container">
          <input type="text" placeholder="Search in site" />
          <button type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>

        <div className="nav-links flex space-x-8">
          <Link href="/" className='text-white'>Home</Link>
          <Link href="/allevent" className='text-white'>Events</Link>
          <Link href="#" className='text-white'>About</Link>
          <Link href="#" className='text-white'>Contact</Link>
          {user && (
            <Link href="/admin/create-event" className='text-white'>Create Event</Link>
          )}
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
                  className="w-full h-full object-cover"
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
  );
};

export default Header;