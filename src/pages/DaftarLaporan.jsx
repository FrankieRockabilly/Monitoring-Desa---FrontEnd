import { useEffect, useState } from "react";
import {
   Box,
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   MenuItem,
   Select,
   Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useParams } from "react-router-dom";
import SuccesMsg from "../components/SuccesMsg";
import BlockIcon from "@mui/icons-material/Block";

const DaftarLaporan = () => {
   const { idDesa } = useParams();
   const [rows, setRows] = useState([]);

   // form field
   const [judul, setJudul] = useState();
   const [isi, setIsi] = useState();
   const [dana, setDana] = useState();
   const [tahun, setTahun] = useState();
   const [status, setStatus] = useState();
   const [selectedFile, setSelectedFile] = useState();
   const currentYear = new Date().getFullYear();
   const years = Array.from(new Array(50), (val, index) => currentYear - index);

   const [succesInputLaporan, setSuccessInputLaporan] = useState(false);
   const [message, setMesssage] = useState("");

   const [selectedLaporan, setSelectedLaporan] = useState();
   const [confirmDeleteLaporan, setConfirmDeleteLaporan] = useState(false);

   const isDeleteLaporan = (idLaporan) => {
      setSelectedLaporan(idLaporan);
      setConfirmDeleteLaporan(true);
      // alert(idLaporan)
   };

   // =====================
   // ambil data dari id Desa untuk dihapus
   // =====================
   const getLaporanByIdDesa = async () => {
      try {
         const response = await axios.get(
            `http://localhost:3000/laporan/desa/${idDesa}`,
            { withCredentials: true }
         );
         console.log(response.data);
         setRows(response.data);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getLaporanByIdDesa();
   }, []);

   // =====================
   // function tambah laporan
   // =====================
   const [tambahLaporan, setTambahLaporan] = useState(false);
   const tutupDialogLaporan = () => {
      setTambahLaporan(false);
   };

   const submitLaporan = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("judul", judul);
      formData.append("isi", isi);
      formData.append("tahun", tahun);
      formData.append("idDesa", idDesa);
      formData.append("status", status);
      formData.append("dana", dana);
      formData.append("file", selectedFile);

      try {
         const response = await axios.post(
            "http://localhost:3000/laporan",
            formData,
            {
               withCredentials: true,
            }
         );
         setTambahLaporan(false);
         // console.log(response.data)
         setSuccessInputLaporan(true);
         await getLaporanByIdDesa();
         setTimeout(() => {
            setSuccessInputLaporan(false);
            setJudul("");
            setIsi("");
            setTahun("");
            setStatus("");
            setDana("");
         }, 2000);
         setMesssage(response.data.msg);
      } catch (error) {
         console.log(error);
      }
   };

   // =====================
   // function hapus laporan
   // =====================
   const deleteLaporan = async () => {
      try {
         const response = await axios.delete(
            `http://localhost:3000/laporan/${selectedLaporan}`,
            { withCredentials: true }
         );
         console.log(response);
         setConfirmDeleteLaporan(false);
         await getLaporanByIdDesa();
      } catch (error) {
         console.log(error);
      }
   };

   const columns = [
      {
         field: "judul",
         headerName: "Judul Laporan",
         width: 200,
      },
      {
         field: "isi",
         headerName: "Isi",
         width: 450,
      },
      {
         field: "dana",
         headerName: "Jumlah Dana Terpakai",
         width: 300,
         headerAlign: "center",
         renderCell: (params) => {
            const formatted = new Intl.NumberFormat("id-ID", {
               style: "currency",
               currency: "IDR",
               minimumFractionDigits: 0,
            }).format(params.value);

            return (
               <div className="flex flex-col justify-center items-center w-full h-full">
                  <div>{formatted}</div>
               </div>
            );
         },
      },
      {
         field: "tahun",
         headerName: "Tahun",
         headerAlign: "center",
         align: "center",
         width: 100,
      },
      {
         field: "file",
         headerName: "Dokumen",
         align: "center",
         width: 200,
         renderCell: (params) => {
            if (!params.value) return <BlockIcon />;

            return (
               <a
                  href={`http://localhost:3000${params.value}`}
                  download
                  style={{ color: "#1976d2", textDecoration: "underline" }}
               >
                  Lihat
               </a>
            );
         },
      },

      {
         field: "status",
         headerName: "Status",
         headerAlign: "center",
         align: "center",
         width: 150,
         renderCell: (params) => (
            <div className="w-full h-full flex flex-col items-center justify-center">
               <div
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                     params.row.status === "terverifikasi"
                        ? "bg-green-400"
                        : params.row.status === "pending"
                        ? "bg-yellow-400"
                        : "bg-gray-400"
                  }`}
               >
                  {params.value}
               </div>
            </div>
         ),
      },
      {
         field: "aksi",
         headerName: "Aksi",
         headerAlign: "center",
         width: 100,
         renderCell: (params) => (
            <Box
               sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
               }}
            >
               <Button
                  // variant="contained"
                  sx={{ color: "gray" }}
                  onClick={() => isDeleteLaporan(params.id)}
               >
                  <DeleteForeverIcon />
               </Button>
            </Box>
         ),
      },
   ];

   return (
      <>
         <div>
            <Box sx={{ height: 800, width: "100%" }}>
               {succesInputLaporan && <SuccesMsg message={message} />}

               <Typography
                  sx={{
                     fontSize: "30px",
                     marginY: "20px",
                     fontWeight: "light",
                  }}
               >
                  Data Laporan guys
               </Typography>
               <Button
                  sx={{
                     width: "10%",
                     backgroundColor: "#1976d2",
                     color: "white",
                     marginY: "20px",
                  }}
                  onClick={() => setTambahLaporan(true)}
               >
                  Tambah
               </Button>
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
            // ===================== // dialog modal tambah laporan //
            =====================
            <Dialog
               open={tambahLaporan}
               onClose={tutupDialogLaporan}
               fullWidth
               maxWidth={false}
               sx={{
                  "& .MuiDialog-paper": { width: "50vw", maxWidth: "none" },
               }}
            >
               <DialogTitle>Input Laporan</DialogTitle>
               <DialogContent>
                  <DialogContentText>
                     Silahkan tambahkan laporan pada desa terkait
                  </DialogContentText>

                  <form
                     id="subscription-form"
                     className="flex flex-col justify-start items-start gap-3 my-3"
                     onSubmit={submitLaporan}
                  >
                     <div className="w-full flex flex-col justify-start items-start gap-2">
                        <label className="font-semibold">Judul Laporan</label>
                        <input
                           type="text"
                           className="w-full outline-none px-4 py-2 border-b-[1px] border-gray-300"
                           placeholder="judul laporan"
                           value={judul}
                           onChange={(e) => setJudul(e.target.value)}
                        />
                     </div>

                     <div className="w-full flex flex-col justify-start items-start gap-2">
                        <label className="font-semibold">
                           Keterangan Singkat
                        </label>
                        <textarea
                           className="w-full outline-none px-4 py-2 border border-gray-300 h-40"
                           placeholder="Masukkan keterangan"
                           value={isi}
                           onChange={(e) => setIsi(e.target.value)}
                        />
                     </div>
                     <div className="w-full flex flex-col justify-start items-start gap-2">
                        <label className="font-semibold">Dana Terpakai</label>
                        <input
                           className="w-full outline-none px-4 py-2 border border-gray-300"
                           placeholder="Rp."
                           value={dana}
                           onChange={(e) => setDana(e.target.value)}
                        />
                     </div>

                     <div className="w-full flex flex-col justify-start items-start gap-2">
                        <label className="font-semibold">Tahun</label>
                        <Select
                           sx={{ width: "100%" }}
                           labelId="tahun-label"
                           value={tahun}
                           label="Tahun"
                           onChange={(e) => setTahun(e.target.value)}
                        >
                           {years.map((year) => (
                              <MenuItem key={year} value={year}>
                                 {year}
                              </MenuItem>
                           ))}
                        </Select>
                     </div>
                     <div className="w-full flex flex-col justify-start items-start gap-2">
                        <label className="font-semibold">Status</label>
                        <select
                           className="w-full px-4 py-2 border shadow-sm  rounded-md "
                           onChange={(e) => setStatus(e.target.value)}
                        >
                           <option>-Pilih Status-</option>
                           <option value="terverifikasi">Terverifikasi</option>
                           <option value="pending">Pending</option>
                           <option value="belum di cek">Belun di cek</option>
                        </select>
                     </div>
                     <div className="w-full flex flex-col justify-start items-start gap-2">
                        <label className="font-semibold">
                           Dokumen Pendukung
                        </label>
                        <input
                           type="file"
                           className="w-full outline-none px-4 py-2 border border-gray-300"
                           onChange={(e) => setSelectedFile(e.target.files[0])}
                        />
                     </div>

                     <p className="italic">
                        Setelah disimpan, data tidak bisa di edit
                     </p>
                     <DialogActions sx={{ marginY: "30px" }}>
                        <Button onClick={() => setTambahLaporan(false)}>
                           Cancel
                        </Button>
                        <Button
                           type="submit"
                           form="subscription-form"
                           sx={{
                              backgroundColor: "darkblue",
                              color: "white",
                              paddingX: "30px",
                           }}
                        >
                           Simpan
                        </Button>
                     </DialogActions>
                  </form>
               </DialogContent>
            </Dialog>
            // ===================== // dialog confirm delete laporan ? //
            =====================
            <Dialog
               open={confirmDeleteLaporan}
               onClose={() => setConfirmDeleteLaporan(false)}
               aria-labelledby="alert-dialog-title"
               aria-describedby="alert-dialog-description"
            >
               <DialogTitle id="alert-dialog-title">
                  {"Yakin ingin menghapus laporan ?"}
               </DialogTitle>
               <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                     Laporan yang dihapus tidak dapat di pulihkan
                  </DialogContentText>
               </DialogContent>
               <DialogActions>
                  <Button onClick={() => setConfirmDeleteLaporan(false)}>
                     Disagree
                  </Button>
                  <Button onClick={deleteLaporan} autoFocus>
                     Hapus
                  </Button>
               </DialogActions>
            </Dialog>
         </div>
      </>
   );
};

export default DaftarLaporan;
