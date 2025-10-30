import { useEffect } from "react";
import { toast } from "sonner";

const ErrorMsg = ({ message }) => {
   useEffect(() => {
      if (message) {
         toast.error(message, {
            description: message,
            duration: 3000, // durasi tampil (ms)
         });
      }
   }, [message]);

   return null; // tidak perlu render elemen manual lagi
};

export default ErrorMsg;
