"use client";
import NavBar from "./components/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import CreateItemModal from "./components/createItemModal";
import ItemCard from "./components/ItemCard";
import toast from "react-hot-toast";

interface User {
  id: string;
  email: string;
  name: string;
}

interface Item {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  userId: string;
}

export default function Home() {
  const [userData, setUserData] = useState<User | null>(null);
  const [items, setItems] = useState<Item[]>([]);

  // Fetch items details
  const fetchItems = async () => {
    try {
      const res = await axios.get("/api/items/getItems");
      setItems(res.data.items);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get("/api/users/me");
        setUserData(res.data.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  // Fetch items when the component mounts
  useEffect(() => {
    fetchItems();
  }, []);

  // Callback function to handle item creation
  const handleItemCreated = () => {
    fetchItems();
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      const res = await axios.delete("/api/items/deleteItem", {
        data: { id: itemId },
      });

      if (res.data.success) {
        toast.success("Item deleted successfully");
        fetchItems();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete item");
    }
  };

  return (
    <>
      {
        <NavBar
          userData={userData}
          setUserData={setUserData}
          show={userData ? true : false}
        />
      }
      <div className="flex justify-center mt-8">
        {userData ? (
          <CreateItemModal
            userId={userData.id}
            onItemCreated={handleItemCreated}
          />
        ) : (
          <p className="text-center mt-4">
            Please log in to create a new item.
          </p>
        )}
      </div>
      {items && items.length === 0 ? (
        <div className="text-center mt-8 text-2xl">
          No items yet. Let's get started by creating your first one!
        </div>
      ) : (
        <div className="flex flex-wrap text-center mt-4 w-10/12 mx-auto my-0 justify-center">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              loggedInUserId={userData?.id}
              onDelete={handleDeleteItem}
            />
          ))}
        </div>
      )}
    </>
  );
}
