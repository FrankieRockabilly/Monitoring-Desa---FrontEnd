import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import axios from "axios";

// icons
import BlockIcon from "@mui/icons-material/Block";

const LaporanDikirim = () => {
   const [rows, setRows] = useState([]);

   const getLaporan = async () => {
      try {
         const response = await axios.get("http://localhost:3000/laporan", {
            withCredentials: true,
         });
         setRows(response.data);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getLaporan();
   }, []);

   const columns = [
      { field: "namaDesa", headerName: "Nama Desa", width: 200 },
      { field: "sumberDana", headerName: "Sumber Dana ", width: 150 },
      { field: "jenisKegiatan", headerName: "Jenis Kegiatan", width: 250 },
      {
         field: "realisasiDana",
         headerName: "Total Dana Digunakan",
         width: 200,
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
      { field: "tanggal", headerName: "Tanggal", width: 200 },
      {
         field: "jenis",
         headerName: "Jenis Laporan",
         width: 200,
         headerAlign: "center",
         renderCell: (params) => {
            <div className="flex justify-center items-center w-full border border-red-700">
               <p className="uppercase"> {params.value} </p>
            </div>;
         },
      },
      {
         field: "file",
         headerName: "Dokumen",
         headerAlign: "center",
         align: "center",
         width: 100,
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
   return (
      <>
         <div className="flex flex-col justify-start items-start w-full border rounded-xl shadow-xl p-10 bg-white">
            <div className="w-full flex flex-col justify-start items-start gap-10 mb-5">
               <div className="w-full flex flex-col justify-start items-start gap-5">
                  <h1 className="font-bold text-4xl">Laporan Dikirim</h1>
                  <p>Comprehensice insights into program performance </p>
               </div>
            </div>

            {/* list daftar laporan */}
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
                  checkboxSelection
                  disableRowSelectionOnClick
               />
            </Box>
         </div>
      </>
   );
};

export default LaporanDikirim;
