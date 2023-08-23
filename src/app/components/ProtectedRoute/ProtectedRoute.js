"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {

    const router = useRouter();
  useEffect(() => {
    const getUser = localStorage.getItem("user");
    if (getUser) {
      router.push("/add-vehicle");
    } else {
      router.push("/login");
    }
  }, []);

  return children;
};

export default ProtectedRoute;
