"use client";
import axios from "axios";
// context/user.js
import { createContext, useContext, useEffect, useState } from "react";
// Creating the user context
const UserContext = createContext();
import { toastAlert } from "../helper/help";
import { useRouter } from "next/navigation";
// Making the function which will wrap the whole app using Context Provider
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({
    loginError: null,
    regError: null,
  });
  const router = useRouter();
  const registerUser = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://rental-app-backend.vercel.app/api/v1/auth/register-user`,
        data
      );
      setLoading(false);
      router.push("/login");
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      setIsError({ loginError: null, regError: error.response.data.message });
    }
  };
  const loginUser = async (comingdata) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `https://rental-app-backend.vercel.app/api/v1/auth/login-user`,
        comingdata
      );
      if (data) {
        toastAlert("success", "Logged in successfully");
        localStorage.setItem("user", JSON.stringify(data.user));
        setLoading(false);
        setUser(data?.user);
        router.push("/");
        setIsError({ loginError: null, regError: null });
        return data?.user;
      }
    } catch (error) {
      toastAlert("error", error.response.data.message);
      setIsError({ loginError: error.response.data.message, regError: null });
      setLoading(false);
    }
  };

  useEffect(() => {
    const getUser = localStorage.getItem("user");
    if (getUser) {
      setUser(JSON.parse(getUser));
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, isError, setUser, loading, registerUser, loginUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Make useUserContext Hook to easily use our context throughout the application
export function useUserContext() {
  return useContext(UserContext);
}
