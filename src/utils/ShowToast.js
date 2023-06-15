import { toast } from "react-toastify";

export const ShowToast = (message, type) => {
  toast[type](message, {
    position: toast.POSITION.TOP__RIGHT,
    autoClose: 3000,
    closeButton: false,
  });
};
