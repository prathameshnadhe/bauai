import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface ConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  onOpenChange,
  onConfirm,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed bg-white p-6 rounded-md shadow-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md">
          <Dialog.Title className="text-lg font-bold mb-4">
            Are you sure?
          </Dialog.Title>
          <p className="mb-4">Are you sure you want to delete this item?</p>
          <div className="flex justify-end">
            <Dialog.Close asChild>
              <button
                className="mr-2 px-4 py-2 border rounded-md hover:bg-gray-200"
                onClick={() => onOpenChange(false)}
              >
                No
              </button>
            </Dialog.Close>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={() => {
                onConfirm();
                onOpenChange(false); // Close modal after confirming
              }}
            >
              Yes
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ConfirmationModal;
