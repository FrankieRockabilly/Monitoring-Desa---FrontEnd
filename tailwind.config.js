/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            hijau: "#34bf8c",
         },
         fontFamily: {
            montserrat: ["Montserrat", "sans-serif"],
            poppins: ["Poppins", "sans-serif"],
         },
      },
   },
   plugins: [],
};