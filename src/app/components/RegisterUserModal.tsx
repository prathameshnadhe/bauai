import { useState } from "react";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";

interface RegisterUserModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function RegisterUserModal({
  open,
  setOpen,
}: RegisterUserModalProps) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
  });

  // Function to handle form for creating a User
  const handleRegisterUser = async () => {
    try {
      if (!user.email || !user.password || !user.name) return;

      const res = await axios.post("/api/users/signup", user);

      // Clear the form after submission
      setUser({ email: "", password: "", name: "" });

      // Close the modal
      setOpen(false);
      toast.success("Signup successful");
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Failed to register user:");
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed bg-white p-6 rounded-md shadow-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md">
          <Dialog.Title className="text-lg font-bold">
            Register User
          </Dialog.Title>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegisterUser();
            }}
            className="space-y-4 mt-4"
          >
            <div>
              <label className="block font-medium">Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                id="name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                placeholder="Name"
              />
            </div>
            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded-md"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
              />
            </div>
            <div>
              <label className="block font-medium">Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded-md"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md w-full"
            >
              Register User
            </button>
          </form>

          <Dialog.Close asChild>
            <button className="absolute top-3 right-3">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
