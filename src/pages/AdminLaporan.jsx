import React, { useEffect, useState } from "react";

// icons
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import axios from "axios";
import Box from "@mui/material/Box";
import BlockIcon from "@mui/icons-material/Block";
import { DataGrid } from "@mui/x-data-grid";

const AdminLaporan = () => {
   const [rows, setRows] = useState([]);
   const columns = [
      { field: "namaDesa", headerName: "Desa", width: 350 },
      {
         field: "realisasiDana",
         headerName: "Dana Digunakan",
         width: 300,
         renderCell: (params) => {
            const value = Number(params.value); // pastikan number

            if (isNaN(value)) return "Rp 0";

            return (
               <span>
                  {new Intl.NumberFormat("id-ID", {
                     style: "currency",
                     currency: "IDR",
                     minimumFractionDigits: 0,
                  }).format(value)}
               </span>
            );
         },
      },
      { field: "tanggal", headerName: "Tanggal", width: 300 },
      { field: "jenis", headerName: "Jenis Laporan", width: 200 },
      {
         field: "file",
         headerName: "File Laporan",
         headerAlign: "center",
         align: "center",
         width: 200,
         renderCell: (params) => {
            if (!params.value) return <BlockIcon />;

            return (
               <a
                  href={`http://localhost:3000${params.value}`}
                  target="blank"
                  download
                  style={{ color: "#1976d2", textDecoration: "underline" }}
               >
                  Lihat
               </a>
            );
         },
      },
   ];

   const [allLaporan, setAllLaporan] = useState(0);
   const [monev, setMonev] = useState(0);
   const [lhp, setLhp] = useState(0);

   const getAllLaporan = async () => {
      try {
         const response = await axios.get("http://localhost:3000/laporan", {
            withCredentials: true,
         });
         setRows(response.data);
         setAllLaporan(response.data.length);
         setMonev(
            response.data.filter((item) => item.jenis == "BA Monev").length
         );
         setLhp(response.data.filter((item) => item.jenis == "LHP").length);
      } catch (error) {}
   };

   useEffect(() => {
      getAllLaporan();
   }, []);
   return (
      <>
         <div className="flex flex-col justify-start items-start w-full border rounded-xl shadow-xl p-10 bg-white min-h-max">
            <div className="w-full flex flex-col justify-start items-start gap-10 mb-5">
               <div className="w-full flex flex-col justify-start items-start gap-5">
                  <h1 className="font-bold text-4xl">Laporan Detail</h1>
                  <p>Comprehensice insights into program performance </p>
               </div>
            </div>
            <div className="flex justify-around items-center gap-10">
               {/* 1 */}
               <div className="border shadow-md rounded-md p-10 flex justify-between items-center gap-28">
                  <div className="flex flex-col justify-start items-start gap-2">
                     <h1 className="font-semibold text-gray-700">
                        Total laporan
                     </h1>
                     <p className="text-2xl font-semibold">{allLaporan} </p>
                  </div>
                  <div className="bg-blue-50 p-5 rounded-lg">
                     <TextSnippetIcon sx={{ color: "blue" }} />
                  </div>
               </div>
               <div className="border shadow-md rounded-md p-10 flex justify-between items-center gap-28">
                  <div className="flex flex-col justify-start items-start gap-2">
                     <h1 className="font-semibold text-gray-700">
                        Laporan Berita Acara Monitoring
                     </h1>
                     <p className="text-2xl font-semibold">{monev} </p>
                  </div>
                  <div className="bg-blue-50 p-5 rounded-lg">
                     <TextSnippetIcon sx={{ color: "blue" }} />
                  </div>
               </div>
               <div className="border shadow-md rounded-md p-10 flex justify-between items-center gap-28">
                  <div className="flex flex-col justify-start items-start gap-2">
                     <h1 className="font-semibold text-gray-700">
                        Total laporan
                     </h1>
                     <p className="text-2xl font-semibold">{lhp} </p>
                  </div>
                  <div className="bg-blue-50 p-5 rounded-lg">
                     <TextSnippetIcon sx={{ color: "blue" }} />
                  </div>
               </div>
               <div className="border shadow-md rounded-md p-10 flex justify-between items-center gap-28">
                  <div className="flex flex-col justify-start items-start gap-2">
                     <h1 className="font-semibold text-gray-700">
                        Total laporan
                     </h1>
                     <p className="text-2xl font-semibold">8</p>
                  </div>
                  <div className="bg-blue-50 p-5 rounded-lg">
                     <TextSnippetIcon sx={{ color: "blue" }} />
                  </div>
               </div>
            </div>

            {/* ======= data grid ====== */}
            <div className="w-full mt-10 rounded-md">
               <Box sx={{ height: 800, width: "100%" }}>
                  <DataGrid
                     rows={rows}
                     columns={columns}
                     initialState={{
                        pagination: {
                           paginationModel: {
                              pageSize: 20,
                           },
                        },
                     }}
                     pageSizeOptions={[5]}
                     disableRowSelectionOnClick
                  />
               </Box>
            </div>
         </div>

         {/* data laporan */}
      </>
   );
};

export default AdminLaporan;
