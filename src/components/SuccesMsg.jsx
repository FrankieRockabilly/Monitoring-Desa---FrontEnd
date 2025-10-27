import { useEffect } from "react";
import { toast } from "sonner";

const SuccessMsg = ({ message }) => {
   useEffect(() => {
      if (message) {
         toast.success(message, {
            description: message,
            duration: 3000, // durasi tampil (ms)
         });
      }
   }, [message]);

   return null; // tidak perlu render elemen manual lagi
};

export default SuccessMsg;
