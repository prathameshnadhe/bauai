"use client";
import NavBar from "./components/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import CreateItemModal from "./components/createItemModal";
import ItemCard from "./components/ItemCard";

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
    } finally {
    }
  };

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get("/api/users/me");
        setUserData(res.data.data);
      } catch (error) {
        console.log("Error fetching user details:", error);
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
    console.log("Item created");
    fetchItems();
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      const res = await axios.delete("/api/items/deleteItem", {
        data: { id: itemId },
      });

      if (res.data.success) {
        console.log("Item deleted:", res.data.item);
        fetchItems();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <>
      {userData && <NavBar userData={userData} show={true} />}
      <div className="flex justify-center mt-8">
        {userData && (
          <CreateItemModal
            userId={userData.id}
            onItemCreated={handleItemCreated}
          />
        )}
      </div>
      <div className="flex flex-wrap text-center mt-4 w-10/12 mx-auto my-0 justify-center">
        {userData &&
          items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              loggedInUserId={userData.id}
              onDelete={handleDeleteItem}
            />
          ))}
      </div>
    </>
  );
}
