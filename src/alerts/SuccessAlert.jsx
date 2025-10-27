import { useEffect } from "react";
import { toast } from "sonner";

const SuccessAlert = ({ message }) => {
   useEffect(() => {
      if (message) {
         toast.success(message, {
            description: "Berhasil Login",
            duration: 3000, // durasi tampil (ms)
         });
      }
   }, [message]);

   return null; // tidak perlu render elemen manual lagi
};

export default SuccessAlert;
