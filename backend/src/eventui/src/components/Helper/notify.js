import { ToastContainer, toast } from "react-toastify";

export const notify = (message, type = "success", place = "bottom-right") => {
    const opt = {
      position: place,
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };

    if (type === "error") {
      toast.error(message, opt);
    } else if (type === "info") {
      toast.info(message, opt);
    } else if (type === "warning") {
      toast.warning(message, opt);
    } else if (type === "dark") {
      toast(message, opt);
    } else {
      toast.success(message, opt);
    }
  };

export const Toast = (ToastContainer);