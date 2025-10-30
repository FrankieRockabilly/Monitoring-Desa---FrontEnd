import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Desa = () => {
   const [rows, setRows] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState();

   // open dialog delete desa
   const [openDelete, setOpenDelete] = useState(false);

   // input field
   const [namaDesa, setNamaDesa] = useState("");
   const [alamat, setAlamat] = useState("");
   const [kecamatan, setKecamatan] = useState("");
   const [kontak, setKontak] = useState("");

   const [openDialog, setOpenDialog] = useState(false);

   // =====================
   // dialog modal tambah laporan
   // =====================
   const [selectedDesa, setSelectedDesa] = useState();
   const [IsDeleteDesa, setIsDeleteDesa] = useState(false);

   const hapusDesa = (idDesa) => {
      setSelectedDesa(idDesa);
      setIsDeleteDesa(true);
   };

   const handleOpenDialog = (e) => {
      e.preventDefault();
      setOpenDialog(true);
   };

   const handleClose = () => {
      setOpenDialog(false);
      setSelectedDesa(null);
   };

   // Ambil data dari server
   const getDesa = async () => {
      try {
         const response = await axios.get("http://localhost:3000/desa", {
            withCredentials: true,
         });
         console.log(response.data);
         setRows(response.data);
         setLoading(false);
      } catch (error) {
         setLoading(false);
         console.log(error.response?.data?.msg);
         setError(error.response?.data?.msg);
      }
   };

   useEffect(() => {
      getDesa();
   }, []);

   // Tambah data desa
   const handleSubmitTambahDesa = async (e) => {
      e.preventDefault();
      try {
         const response = await axios.post(
            "http://localhost:3000/desa",
            {
               namaDesa,
               kecamatan,
               alamat,
               kontak,
            },
            {
               withCredentials: true,
            }
         );
         console.log(response);
         setOpenDialog(false);
         getDesa();
         // reset input
         setNamaDesa("");
         setKecamatan("");
         setAlamat("");
         setKontak("");
      } catch (error) {
         console.log(error);
      }
   };

   const handleDeleteDesa = async () => {
      // console.log(desaId);
      try {
         const response = await axios.delete(
            `http://localhost:3000/desa/${selectedDesa}`,
            { withCredentials: true }
         );
         console.log(response);
         setSuccesDeleteDesa(true);
         setIsDeleteDesa(false);
         getDesa();
      } catch (error) {
         console.log("Edit Error:", error);
         setErrorDeleteDesa(true);
      }
   };

   const columns = [
      // { field: "id", headerName: "id", width: 90 },
      {
         field: "nama_desa",
         headerName: "Nama Desa",
         width: 300,
      },
      { field: "kecamatan", headerName: "Kecamatan", width: 300 },
      { field: "alamat", headerName: "Alamat", width: 450 },
      { field: "kontak", headerName: "Kontak", width: 180 },
      {
         field: "actions",
         headerName: "Actions",
         width: 180,
         headerAlign: "center",
         sortable: false,
         filterable: false,
         renderCell: (params) => (
            <>
               <Link to={`/editDesa/${params.id}`}>
                  <Button
                     sx={{
                        padding: "7px",
                        marginRight: "10px",
                        backgroundColor: "green",
                        color: "white",
                        fontSize: "10px",
                     }}
                  >
                     Edit
                  </Button>
               </Link>
               <Button
                  sx={{
                     padding: "7px",
                     backgroundColor: "#b01527",
                     color: "white",
                     fontSize: "10px",
                  }}
                  onClick={() => hapusDesa(params.id)}
               >
                  Hapus
               </Button>
            </>
         ),
      },
   ];

   return (
      <div className="flex flex-col justify-start items-start w-full border rounded-xl shadow-xl p-10 bg-white">
         <div className="w-full flex flex-col justify-start items-start gap-10 mb-5">
            <div className="w-full flex flex-col justify-start items-start gap-5">
               <h1 className="font-bold text-4xl">Data Desa</h1>
               <p>Comprehensice insights into program performance </p>
            </div>
         </div>
         <Button
            sx={{ width: "10%", marginBottom: "20px" }}
            variant="contained"
            onClick={handleOpenDialog}
         >
            Tambah Desa
         </Button>

         <Box sx={{ height: 500, width: "100%" }}>
            <DataGrid
               rows={rows}
               columns={columns}
               loading={loading}
               pageSizeOptions={[5, 100]}
               initialState={{
                  pagination: {
                     paginationModel: {
                        pageSize: 20,
                     },
                  },
               }}
               disableRowSelectionOnClick
            />
         </Box>

         {/* Dialog Tambah */}
         <Dialog
            open={openDialog}
            onClose={handleClose}
            fullWidth
            maxWidth={false}
            sx={{ "& .MuiDialog-paper": { width: "50vw", maxWidth: "none" } }}
         >
            <DialogTitle className="text-2xl font-bold">
               Tambah Data Desa
            </DialogTitle>
            <DialogContent>
               <DialogContentText className="indent-10">
                  Masukkan nama desa Anda untuk melihat informasi dan layanan
                  yang tersedia secara khusus untuk wilayah tersebut.
               </DialogContentText>
               <form id="form-tambah-desa" onSubmit={handleSubmitTambahDesa}>
                  <div className="w-full my-8 flex flex-col justify-start items-start gap-8">
                     <div className="w-full flex flex-col">
                        <label className="font-medium">Nama Desa</label>
                        <input
                           type="text"
                           className="px-4 py-3 border rounded outline-none shadow-sm"
                           placeholder="Masukkan Nama Desa"
                           value={namaDesa}
                           onChange={(e) => setNamaDesa(e.target.value)}
                           required
                        />
                     </div>

                     <div className=" flex w-full flex-col">
                        <label className="font-medium">Kecamatan</label>
                        <input
                           type="text"
                           className="px-4 py-3 border rounded outline-none shadow-sm"
                           placeholder="Masukkan Kecamatan"
                           value={kecamatan}
                           onChange={(e) => setKecamatan(e.target.value)}
                           required
                        />
                     </div>
                  </div>

                  <div className="w-full flex flex-col">
                     <label className="font-medium">Alamat</label>
                     <textarea
                        type="text"
                        className="px-4 py-3 border rounded outline-none shadow-sm h-[10rem]"
                        placeholder="Masukkan Alamat"
                        value={alamat}
                        onChange={(e) => setAlamat(e.target.value)}
                        required
                     />
                  </div>

                  <div className="w-full flex flex-col">
                     <label className="font-medium">Kontak</label>
                     <input
                        type="text"
                        className="px-4 py-3 border rounded outline-none shadow-sm"
                        placeholder="Misal +62 88 xxxxx"
                        value={kontak}
                        onChange={(e) => setKontak(e.target.value)}
                        required
                     />
                  </div>
                  <DialogActions>
                     <Button onClick={handleClose}>Cancel</Button>
                     <Button
                        sx={{
                           background: "blue",
                           padding: "10px 20px",
                           color: "white",
                        }}
                        type="submit"
                        form="form-tambah-desa"
                     >
                        Simpan
                     </Button>
                  </DialogActions>
               </form>
            </DialogContent>
         </Dialog>

         {/* confirm delete desa */}
         <Dialog
            open={IsDeleteDesa}
            // onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
         >
            <DialogTitle id="alert-dialog-title">{"Hapus Desa ?"}</DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-description">
                  Yakin untuk Hapus Desa ? Ini akan menghapus semua data program
                  dan laporan desa terkait
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={() => setIsDeleteDesa(false)}>Batal</Button>
               <Button onClick={handleDeleteDesa} autoFocus>
                  Hapus
               </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
};

export default Desa;
