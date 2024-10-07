"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import NavBar from "../components/navbar";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);

      toast.success("Login successful");
      router.push("/");
    } catch (error: any) {
      console.error("Login failed", error);
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [user]);

  return (
    <>
      <NavBar userData={null} setUserData={() => {}} show={false} />
      <Dialog open={true}>
        <DialogContent className="flex flex-col items-center justify-center mt-[8rem] p-4 bg-white rounded-lg ">
          <DialogTitle className="text-4xl mb-4">
            {loading ? "Processing..." : "Login"}
          </DialogTitle>
          <hr />
          <Label htmlFor="email" className="mb-2">
            Email
          </Label>
          <input
            type="email"
            className="p-2 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
          />
          <Label htmlFor="password" className="mb-2">
            Password
          </Label>
          <input
            type="password"
            className="p-2 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
          />

          <button
            className="p-2 text-white border border-blue-950 bg-blue-600 hover:bg-blue-800 rounded-lg mb-4 focus:outline-none cursor-pointer"
            onClick={onLogin}
            disabled={btnDisabled}
          >
            Login
          </button>
          <DialogClose asChild>
            <div>
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-700">
                Register
              </Link>
            </div>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
