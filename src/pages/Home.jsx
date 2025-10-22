import React, { useEffect, useState } from "react";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PhonelinkEraseIcon from "@mui/icons-material/PhonelinkErase";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import axios from "axios";

const Home = () => {
   const [fourPrograms, setFourPrograms] = useState([]);
   const [programCount, setProgramCount] = useState(0);
   const [programPending, setProgramPending] = useState(0);
   const [programDisetujui, setprogramDisetujui] = useState(0);
   const [programDitolak, setProgramDitolak] = useState(0);

   const getRecentProgram = async () => {
      try {
         const response = await axios.get("http://localhost:3000/program", {
            withCredentials: true,
         });
         setFourPrograms(response.data.slice(0, 4));
         setProgramCount(response.data.length);
         setProgramPending(
            response.data.filter((item) => item.status == "pending").length
         );
         setprogramDisetujui(
            response.data.filter((item) => item.status == "disetujui").length
         );
         setProgramDitolak(
            response.data.filter((item) => item.status == "ditolak").length
         );
         console.log(response.data.slice(0, 4));
      } catch (error) {
         console.log(error);
      }
   };

   const formatRupiah = (angka) => {
      return new Intl.NumberFormat("id-ID", {
         style: "currency",
         currency: "IDR",
         minimumFractionDigits: 0,
      }).format(angka);
   };

   useEffect(() => {
      getRecentProgram();
   }, []);

   return (
      <>
         <div className="flex flex-col justify-center items-center w-full border rounded-xl shadow-xl p-10">
            <div className="w-full flex flex-col justify-start items-start gap-10 mb-5">
               <div className="w-full flex flex-col justify-start items-start gap-5">
                  <h1 className="font-bold text-4xl">Welcome Back</h1>
                  <p>Here's an overview of your program submissions</p>
               </div>
            </div>

            <div className="w-full flex flex-wrap justify-between items-center ">
               {/* 1 */}
               <div className="p-5 shadow-md border border-gray-300 rounded-lg w-80">
                  <div className="flex flex-col justify-start items-start gap-5">
                     <div className="p-5 rounded-md bg-teal-50">
                        <FolderCopyIcon sx={{ color: "darkgreen" }} />{" "}
                     </div>
                     <p>Total Program</p>
                     <p className="font-extrabold text-3xl"> {programCount} </p>
                  </div>
               </div>
               {/* 1 */}
               <div className="p-5 shadow-md border border-gray-300 rounded-lg w-80">
                  <div className="flex flex-col justify-start items-start gap-5">
                     <div className="p-5 rounded-md bg-orange-50">
                        <AccessTimeIcon sx={{ color: "darkorange" }} />{" "}
                     </div>
                     <p>Pending Review</p>
                     <p className="font-extrabold text-3xl">
                        {programPending}{" "}
                     </p>
                  </div>
               </div>
               {/* 1 */}
               <div className="p-5 shadow-md border border-gray-300 rounded-lg w-80">
                  <div className="flex flex-col justify-start items-start gap-5">
                     <div className="p-5 rounded-md bg-green-50">
                        <CheckCircleOutlineIcon sx={{ color: "darkgreen" }} />{" "}
                     </div>
                     <p>Program Disetujui</p>
                     <p className="font-extrabold text-3xl">
                        {programDisetujui}{" "}
                     </p>
                  </div>
               </div>
               {/* 1 */}
               <div className="p-5 shadow-md border border-gray-300 rounded-lg w-80">
                  <div className="flex flex-col justify-start items-start gap-5">
                     <div className="p-5 rounded-md bg-red-50">
                        <PhonelinkEraseIcon sx={{ color: "darkred" }} />{" "}
                     </div>
                     <p>Program Ditolak</p>
                     <p className="font-extrabold text-3xl">
                        {[programDitolak]}{" "}
                     </p>
                  </div>
               </div>
            </div>

            {/* RECENT PRGRAMS */}
            <div className="w-full rounded-md border border-gray-300 my-10">
               <div className="border flex justify-start items-start gap-10 p-5">
                  <TrendingUpIcon />
                  <p className="text-xl font-semibold">
                     Program terakhir di ajukan
                  </p>
               </div>

               {/* daftar program */}
               <div className="flex flex-col justify-start items-start">
                  {fourPrograms.map((value) => {
                     return (
                        <div className="w-full flex justify-between items-start border p-5">
                           <div key={value.id}>
                              <h1 className="font-semibold text-lg">
                                 {value.program}{" "}
                              </h1>
                              <p className="font-light">
                                 {value.jenis_kegiatan}{" "}
                              </p>
                              <div className="flex justify-start items-center gap-2 font-light">
                                 <p>{formatRupiah(value.alokasi_dana)} .</p>
                                 <p>{value.nama_desa} -</p>
                                 <p>{value.tanggal}</p>
                              </div>
                           </div>

                           <div
                              className={`${
                                 value.status === "disetujui"
                                    ? "text-green-700 bg-green-100 border-2 border-green-400 px-3 py-1 text-sm rounded-md"
                                    : value.status === "pending"
                                    ? "text-gray-700 bg-gray-100 border-2 border-gray-400 px-3 py-1 text-sm rounded-md"
                                    : "text-red-500"
                              }`}
                           >
                              {value.status}
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
         </div>
      </>
   );
};

export default Home;
