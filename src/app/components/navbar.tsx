import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import RegisterUserModal from "./RegisterUserModal";
interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

const NavBar = ({
  userData,
  setUserData,
  show,
}: {
  userData: User | null;
  setUserData: React.Dispatch<React.SetStateAction<User | null>>;
  show: boolean;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("User logged out");
      setUserData(null);
      router.push("/");
    } catch (error: any) {
      console.error("Logout error:", error);
      toast.error("Failed to logout: " + error.message);
    }
  };

  const goToHome = () => {
    router.push("/");
  };

  return (
    <>
      <nav className="flex flex-wrap justify-between items-center p-4 px-24 text-2xl">
        <div>
          <button onClick={goToHome}>BAU AI</button>
        </div>
        {userData === null ? (
          <Link href="/login">Login</Link>
        ) : (
          show && (
            <div className="flex flex-wrap items-center">
              <p className="mx-4">{userData.name}</p>
              {userData?.isAdmin && (
                <button
                  className="mx-4 hover:text-orange-600"
                  onClick={() => setOpen(true)}
                >
                  Register User
                </button>
              )}
              <button onClick={logout} className="mx-4 hover:text-orange-600">
                Logout
              </button>
            </div>
          )
        )}
      </nav>
      <RegisterUserModal open={open} setOpen={setOpen} />
    </>
  );
};

export default NavBar;
