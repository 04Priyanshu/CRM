"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

const SignInPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.email || !formData.password) {
      toast.error("Both fields are required");
      setIsSubmitting(false);
      return;
    }

    try {
     const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      
      const response = await axios.post(`${API_URL}/api/login`, formData, {
        withCredentials: true, // Include cookies (important for auth)
      });

      toast.success("Signed in successfully"|| response.data.message);
      router.replace("/"); // Navigate after success
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Try again!";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
         <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-gray-900 mb-6">
                        Sign In
                    </h1>
                    <p className="mb-4 text-gray-600">
                        Sign in to start your Dashboard
                    </p>
                </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              placeholder="Enter your email"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              placeholder="Enter your password"
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-400"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default SignInPage;
