import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLoginUserMutation, usePostNewUserMutation } from "../redux/Api";
import Cookie from "js-cookie";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/authSlice";


type LoginResponse = {
  data: {
    user:{
      _id: string;
   
    email: string;
    },
    accessToken: string;
   
  };
  success: boolean;
  message: string;
};

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUser, {  isLoading }] = useLoginUserMutation();
  const [registerUser, { isLoading: loader }] = usePostNewUserMutation();

  type ErrorType = FetchBaseQueryError | SerializedError;

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      // Define the type of the response based on the API call
      const result: LoginResponse = await (isLogin
        ? loginUser({ email, password }).unwrap()
        : registerUser({ email, password }).unwrap());

      // Successfully logged in or registered
      console.log(result.data);
      if (result.success) {
        dispatch(setUser({ userId: result.data.user._id }));
        Cookie.set("user_cookie",JSON.stringify(result?.data),{expires:7})
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(result.message || "Login failed");
      }
      Cookie.set("accessToken", result.data.accessToken, { expires: 1 });
      console.log("User logged in successfully!");
    } catch (err: unknown) {
      const error = err as ErrorType;

      if ("status" in error) {
        console.error("API Error:", error.status, error.data);
      } else if ("message" in error) {
        console.error("Client Error:", error.message);
      } else {
        console.error("Unexpected Error:", error);
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const inputVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  if (isLoading || loader) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <motion.div
        className="bg-gray-900 rounded-lg shadow-xl overflow-hidden max-w-md w-full border border-gray-800"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-white">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={inputVariants}>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </motion.div>
            <motion.div variants={inputVariants}>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </motion.div>
            <motion.div variants={inputVariants}>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </motion.div>
          </form>
        </div>
        <motion.div
          className="px-8 py-4 bg-gray-800 border-t border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-center text-gray-300">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={toggleMode}
              className="ml-1 font-medium text-indigo-400 hover:text-indigo-300 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
