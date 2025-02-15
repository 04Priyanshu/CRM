// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-hot-toast";
// import API from "../../utils/axiosInstance";
// import Loader from "@/components/Loader";


// const SignInPage = () => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const router = useRouter();

//   const handleChange = (e) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (!formData.email || !formData.password) {
//       toast.error("Both fields are required");
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      
//       const response = await API.post(`${API_URL}/api/login`, formData);

//       toast.success("Signed in successfully");
//       router.replace("/dashboard"); // Navigate after success
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message || "Something went wrong. Try again!";
//       toast.error(errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
//   if (isSubmitting) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gray-300 p-4">
//         <div className="w-full max-w-md p-6  text-center">
//           <Loader />
//           <h1 className="text-2xl font-semibold text-gray-800">Signing In...</h1>
//         </div>
//       </div>
//     );
    
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-300 p-4">
//       <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
//          <div className="text-center">
//                     <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-gray-900 mb-6">
//                         Sign In
//                     </h1>
//                     <p className="mb-4 text-gray-600">
//                         Sign in to start your Dashboard
//                     </p>
//                 </div>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-700">Email</label>
//             <input
//               // type="email"
//               // use email type for better validation--------------------------------------->
//               type="text"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
//               placeholder="Enter your email"
//               disabled={isSubmitting}
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
//               placeholder="Enter your password"
//               disabled={isSubmitting}
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-400"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Signing In..." : "Sign In"}
//           </button>
//         </form>
        
//       </div>
//     </div>
//   );
// };

// export default SignInPage;



"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import API from "../../utils/axiosInstance";
import Loader from "@/components/Loader";
import Image from "next/image";

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
      await API.post(`${API_URL}/api/login`, formData);

      toast.success("Signed in successfully");
      router.replace("/dashboard");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Try again!";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-gray-300 p-4">
        <div className="w-full max-w-md p-6 text-center">
          <Loader />
          <h1 className="text-2xl font-semibold text-gray-800">Signing In...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-300 p-4">
      {/* Background Images */}
      
      <Image width={360} height={360} src="/right.svg" alt=" " className="absolute bottom-0 right-0  opacity-80" />
      <Image width={360} height={360} src="/left.svg" alt=" " className="absolute bottom-0 left-0  opacity-80" />
    

      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md relative z-10">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-gray-900 mb-6">
            Sign In
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              // type="email"
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
