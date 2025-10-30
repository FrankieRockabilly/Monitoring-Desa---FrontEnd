import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import BlockIcon from "@mui/icons-material/Block";
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';


// icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
} from "@mui/material";
import { Link } from "react-router-dom";
import SuccessMsg from "../components/SuccesMsg";
// import FileUploadIcon from "@mui/icons-material/FileUpload";

const ListProgram = () => {
   const [rows, setRows] = useState([]);
   const [selectedId, setSelectedId] = useState();
   const [successDelete, setSuccessDelete] = useState(false);
   const [isDeleteProgram, setIsDeleteProgram] = useState(false);
   const [message, setMessage] = useState("");

   // get all program yang ada
   const getAllProgram = async () => {
      try {
         const response = await axios.get("http://localhost:3000/program", {
            withCredentials: true,
         });
         setRows(response.data);
      } catch (error) {
         console.log(error);
      }
   };

   const hapusProgram = async (programId) => {
      setSelectedId(programId);
      setIsDeleteProgram(true);
   };

   //  ======= hapus program
   const deleteProgram = async () => {
      try {
         const response = await axios.delete(
            `http://localhost:3000/program/${selectedId}`,
            { withCredentials: true }
         );
         setMessage(response.data.msg);
         setSuccessDelete(true);
         setIsDeleteProgram(false);
         setTimeout(() => {
            setSuccessDelete(false);
         }, 2000);
         await getAllProgram();
      } catch (error) {
         setSuccessDelete(false);
      }
   };

   useEffect(() => {
      getAllProgram();
   }, []);

   const columns = [
      { field: "nama_desa", headerName: "Desa", width: 170 },
      { field: "jenis_kegiatan", headerName: "jenis Program", width: 200 },
      { field: "program", headerName: "Nama Program", width: 200 },
      {
         field: "alokasi_dana",
         headerName: "Budget",
         width: 150,
         editable: true,
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
      {
         field: "realisasi_dana",
         headerName: "Terealisasikan",
         width: 120,
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
      {
         field: "verifikasi",
         headerName: "Status",
         width: 200,
         headerAlign: "center",
         renderCell: (params) => (
            <div className="w-full h-full flex flex-col items-center justify-center">
               <div
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                     params.row.verifikasi === "disetujui"
                        ? "bg-green-400"
                        : params.row.verifikasi === "pending"
                        ? "bg-gray-400"
                        : "bg-red-600"
                  }`}
               >
                  {params.value}
               </div>
            </div>
         ),
      },
      { field: "keterangan", headerName: "Deskripsi", width: 200 },
      {
         field: "actiopns",
         headerName: "Aksi",
         width: 100,
         headerAlign: "center",
         renderCell: (params) => (
            <div className="w-full h-full flex flex-col justify-center items-center">
               <div className="flex justify-center items-center gap-2">
                  <Link to={`/editProgram/${params.id}`}>
                     <button>
                        <span>
                           <EditIcon />{" "}
                        </span>{" "}
                     </button>
                  </Link>
                  <button onClick={() => hapusProgram(params.id)}>
                     <span>
                        <DeleteIcon sx={{ color: "darkred" }} />{" "}
                     </span>{" "}
                  </button>
               </div>
            </div>
         ),
      },
   ];

   return (
      <>
         <div className="flex flex-col justify-center items-center w-full border rounded-xl shadow-xl p-10 bg-white">
            {successDelete && <SuccessMsg message={message} />}
            <div className="w-full flex flex-col justify-start items-start gap-10 mb-5">
               <div className="flex justify-between items-start w-full">
                  <div className="w-full flex flex-col justify-start items-start gap-5">
                     <h1 className="font-bold text-4xl">List Program Desa</h1>
                     <p>View and manage all your submitted programs</p>
                  </div>
                  {/* <button
                     onClick={() => exportProgramsToWord(rows)}
                     className="flex justify-center items-center gap-5 bg-sky-600 rounded-md px-4 py-2 w-max text-white"
                  >
                     <FileUploadIcon />
                     <p>Export</p>
                  </button> */}
               </div>
               <div className="w-full ">
                  <input
                     type="text"
                     className="border border-gray-300 outline-none w-full px-5 py-3  rounded-lg"
                     placeholder="Search"
                  />
               </div>
            </div>

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

            <Dialog
               open={isDeleteProgram}
               aria-labelledby="alert-dialog-title"
               aria-describedby="alert-dialog-description"
            >
               <DialogTitle id="alert-dialog-title">
                  {"Hapus Program ini?"}
               </DialogTitle>
               <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                     Setelah dihapus, program tidak dapat dipulihkan
                  </DialogContentText>
               </DialogContent>
               <DialogActions>
                  <Button onClick={() => setIsDeleteProgram(false)}>
                     Batal
                  </Button>
                  <Button
                     onClick={deleteProgram}
                     sx={{
                        backgroundColor: "blue",
                        color: "white",
                        paddingX: "20px",
                     }}
                  >
                     Hapus
                  </Button>
               </DialogActions>
            </Dialog>
         </div>
      </>
   );
};

export default ListProgram
