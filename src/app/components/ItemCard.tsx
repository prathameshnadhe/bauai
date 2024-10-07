import React from "react";

interface Item {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  userId: string;
}

interface ItemCardProps {
  item: Item;
  loggedInUserId?: string;
  onDelete: (itemId: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({
  item,
  loggedInUserId,
  onDelete,
}) => {
  const { title, description, userId } = item;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {loggedInUserId === userId && (
          <button
            className="bg-red-500 text-white px-2 py-1 rounded-md mt-2"
            onClick={() => onDelete(item.id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
