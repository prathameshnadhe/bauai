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
// import { ThemeProvider } from "@radix-ui/theme";

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [btnDisabled, setBtnDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (err: any) {
      console.log("Signup failed", err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.name.length > 0
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [user]);

  return (
    <Dialog open={true}>
      <DialogContent className="flex flex-col items-center justify-center min-h-screen p-4 bg-white rounded-lg shadow-lg">
        <DialogTitle className="text-4xl mb-4">
          {loading ? "Processing..." : "Signup"}
        </DialogTitle>
        <hr />
        <Label htmlFor="name" className="mb-2">
          Name
        </Label>
        <input
          type="text"
          className="p-2 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          id="name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder="Name"
        />
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
          className="p-2 cursor-pointer text-white border border-blue-950 bg-blue-600 hover:bg-blue-800 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          onClick={onSignup}
          disabled={btnDisabled}
        >
          Sign Up
        </button>
        <DialogClose asChild>
          <div>
            Do you have an account?{" "}
            <Link href="/login" className="text-blue-700">
              Login
            </Link>
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
