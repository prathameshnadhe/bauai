import { toast, ToastPosition } from "react-hot-toast";

const config = {
  position: "top-right" as ToastPosition,
  duration: 4000,
  style: {
    background: "#333",
    color: "#fff",
  },
};

const customToast = (message: string) => {
  toast(message, config);
};

export { customToast };
