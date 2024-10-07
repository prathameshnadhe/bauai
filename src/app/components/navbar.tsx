"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

interface User {
  id: string;
  email: string;
  name: string;
}

const NavBar = ({
  userData,
  show,
}: {
  userData: User | null;
  show: Boolean;
}) => {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success(`User logged out`);
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <nav className="flex flex-wrap justify-between items-center p-4 px-24 text-2xl">
      <div className="">BAU AI</div>
      {show && userData && (
        <div className="flex flex-wrap items-center">
          <p className="px-6">{userData.name}</p>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
