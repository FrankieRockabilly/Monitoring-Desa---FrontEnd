import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";

export default function Laporan() {
   const [rows, setRows] = useState([]);

   // =====================
   // ambil data semua laporan
   // =====================
   useEffect(() => {
      const getLaporan = async () => {
         try {
            const response = await axios.get("http://localhost:3000/desa", {
               withCredentials: true,
            });
            setRows(response.data);
            console.log(response.data);
         } catch (error) {
            console.log(error);
         }
      };
      getLaporan();
   }, []);

   const columns = [
      {
         field: "nama_desa",
         headerName: "Desa",
         width: 250,
         backgroundColor: "grey",
      },
      {
         field: "kecamatan",
         headerName: "Kecamatan",
         width: 600,
         editable: true,
      },
      {
         field: "lihat",
         headerName: "Detail",
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
                  <Link to={`/daftarLaporan/${params.id}`}>
                     <Button
                        variant="contained"
                        sx={{ backgroundColor: "#1976d2", color: "white" }}
                        // onClick={() => alert(params.id)}
                     >
                        Lihat
                     </Button>
                  </Link>
               </Box>
            );
         },
      },
   ];

   return (
      <Box sx={{ height: 400, width: "100%" }}>
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
                     pageSize: 5,
                  },
               },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
         />
      </Box>
   );
}
