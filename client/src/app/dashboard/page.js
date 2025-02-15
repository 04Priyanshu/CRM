"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Import router
import useAuth from "../../hooks/useAuth";
import API from "@/utils/axiosInstance";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const router = useRouter(); // Get router instance

  if (loading) return <p>Loading...</p>;

  const logout = async () => {
    try {
      const response = await API.post("/logout");
      toast.success(response.data.message);
      
      router.push("/sign-in"); // Redirect to sign-in page after logout
    } catch (error) {
      toast.error("Logout failed. Try again.");
      console.error(error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.email}!</h2>
          <p>Role: {user.role}</p>
          <pre>{JSON.stringify(user, null, 2)}</pre> {/* Display user data properly */}
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Please log in to view the dashboard.</p>
      )}
    </div>
  );
};

export default Dashboard;
