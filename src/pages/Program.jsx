import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Program() {
   const [rows, setRows] = useState([]);
   // get data desa dulu
   useEffect(() => {
      const getDesa = async () => {
         try {
            const response = await axios.get("http://localhost:3000/desa", {
               withCredentials: true,
            });
            setRows(response.data);
         } catch (error) {
            console.log(error);
         }
      };
      getDesa();
   }, []);

   const columns = [
      { field: "nama_desa", headerName: "Desa", width: 250 },
      {
         field: "kecamatan",
         headerName: "Kecamatan",
         width: 600,
         editable: true,
      },
      {
         field: "lihat",
         headerName: "Action",
         headerAlign: "center",
         width: 250,
         renderCell: (params) => {
            return (
               <Box
                  sx={{
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     height: "100%", // penting untuk vertical center
                     width: "100%",
                  }}
               >
                  <Link to={`/daftarProgram/${params.id}`}>
                     <button
                        className="px-3 py-2 bg-blue-800 rounded-lg text-white text-sm"
                        sx={{ backgroundColor: "#1976d2", color: "white" }}
                     >
                        Detail
                     </button>
                  </Link>
               </Box>
            );
         },
      },
   ];

   return (
      <Box sx={{ height: 800, width: "100%" }}>
         <Typography
            sx={{ fontSize: "30px", marginY: "20px", fontWeight: "light" }}
         >
            Data Program
         </Typography>
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
            pageSizeOptions={[20]}
            checkboxSelection
            disableRowSelectionOnClick
         />
      </Box>
   );
}
