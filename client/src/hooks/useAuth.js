import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For redirection
import API from "../utils/axiosInstance";
import toast from "react-hot-toast";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Get router for redirection

  const fetchUser = async () => {
    try {
      const response = await API.get("/me");
      setUser(response.data.user);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error(error.response.data.message || "Session expired. Please log in.");
        router.push("/sign-in"); // Redirect to login if not authenticated
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, fetchUser };
};

export default useAuth;
