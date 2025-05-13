"use client";
import { FcGoogle } from "react-icons/fc";
import React, { useEffect, useState } from 'react';
import './Club_signup.css';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";

const Club_Signup = () => {
  const client = useSession();
  const redirect = useRouter();

  useEffect(() => {
    if (client?.data?.user?.email) {
      redirect.push("/");
    }
  }, [client?.data?.user?.email]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  // Prevent form from refreshing the page

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Invalid email format");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!formData.agreedToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/club_signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          location: formData.location,
          password: formData.password,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Club registered successfully!');
        setFormData({
          name: '',
          email: '',
          location: '',
          password: '',
          confirmPassword: '',
          agreedToTerms: false,
        });
      } else {
        alert(result.error || 'Signup failed');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert('Server error: ' + error.message);
      } else {
        alert('An unknown error occurred');
      }
    } finally {
      setLoading(false);  // Ensure the loading state is reset
    }
  };

  return (
    <div className="main-content d-flex flex-wrap py-3">
      <div className="image-section">
       <img src="./holifest.jpeg" alt="Event" />
      </div>
      <div className="form-section col-sm-12 col-md-6">
        <h2>Club Sign Up</h2>
        <p>Create your account</p>
        <label>
        <input
          type="checkbox"
          name="agreedToTerms"
          checked={formData.agreedToTerms}
          onChange={handleChange}
          required
        />
        I agree to the Terms and Conditions
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        
        <button
          onClick={() => {
            signIn("google", {
              isAdmin: "asdfasdf"
            });
          }}
          className="flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition duration-200 mt-4"
        >
          <FcGoogle className="text-xl" />
          <span className="text-sm font-medium text-gray-700">Sign in with Google</span>
        </button>

      </div>

    </div>
    // <main className="main-content d-flex flex-wrap py-3">
    //   <div className="image-section">
    //     <img src="./holifest.jpeg" alt="Event" />
    //   </div>
    //   <div className="form-section col-sm-12 col-md-6">
    //     <h2>Club Sign Up</h2>
    //     <p>Create your account</p>
    //     <div className="form">
    //       <form onSubmit={handleSubmit}>
    //         <input
    //           type="text"
    //           name="name"
    //           placeholder="Club Name"
    //           value={formData.name}
    //           onChange={handleChange}
    //           required
    //         />
    //         <input
    //           type="email"
    //           name="email"
    //           placeholder="Club Official Email Address"
    //           value={formData.email}
    //           onChange={handleChange}
    //           required
    //         />
    //         <input
    //           type="text"
    //           name="location"
    //           placeholder="Location"
    //           value={formData.location}
    //           onChange={handleChange}
    //           required
    //         />
    //         <input
    //           type="password"
    //           name="password"
    //           placeholder="Password"
    //           value={formData.password}
    //           onChange={handleChange}
    //           required
    //         />
    //         <input
    //           type="password"
    //           name="confirmPassword"
    //           placeholder="Confirm Password"
    //           value={formData.confirmPassword}
    //           onChange={handleChange}
    //           required
    //         />
            // <label>
            //   <input
            //     type="checkbox"
            //     name="agreedToTerms"
            //     checked={formData.agreedToTerms}
            //     onChange={handleChange}
            //     required
            //   />
            //   I agree to the Terms and Conditions
            // </label>
            // <button type="submit" disabled={loading}>
            //   {loading ? 'Submitting...' : 'Submit'}
            // </button>
    //       </form>

    //       <hr />

          // <button
          //   onClick={() => {
          //     signIn("google", {
          //       isAdmin: "asdfasdf"
          //     });
          //   }}
          //   className="flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition duration-200 mt-4"
          // >
          //   <FcGoogle className="text-xl" />
          //   <span className="text-sm font-medium text-gray-700">Sign in with Google</span>
          // </button>
    //     </div>
    //   </div>
    // </main>
  );
};

export default Club_Signup;
