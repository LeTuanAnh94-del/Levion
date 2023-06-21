import { toast } from "react-toastify";

export const ShowToast = (message, type) => {
  toast(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    type,
  });
};
