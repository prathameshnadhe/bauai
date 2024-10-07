import { useState } from "react";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";

interface CreateItemModalProps {
  userId: string;
  onItemCreated: () => void;
}

export default function CreateItemModal({
  userId,
  onItemCreated,
}: CreateItemModalProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  // Function to handle form for creating an item
  const handleCreateItem = async () => {
    try {
      if (!title || !description || !userId) return;

      const res = await axios.post("/api/items/createItem", {
        title,
        description,
        userId,
      });

      // Clear the form after submission
      setTitle("");
      setDescription("");

      // Call the callback to refresh items
      onItemCreated();

      // Close the modal
      setOpen(false);
      toast.success("Item created successfully");
    } catch (error) {
      console.error("Error creating item:", error);
      toast.success("Failed to create item");
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => setOpen(true)}
        >
          Create Item
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed bg-white p-6 rounded-md shadow-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md">
          <Dialog.Title className="text-lg font-bold">
            Create New Item
          </Dialog.Title>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateItem();
            }}
            className="space-y-4 mt-4"
          >
            <div>
              <label className="block font-medium">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded-md"
                rows={4}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md w-full"
            >
              Create
            </button>
          </form>

          <Dialog.Close asChild>
            <button
              className="absolute top-3 right-3"
              onClick={() => {
                setTitle("");
                setDescription("");
              }}
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
