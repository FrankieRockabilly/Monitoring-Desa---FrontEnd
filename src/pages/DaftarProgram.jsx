import React, { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BlockIcon from "@mui/icons-material/Block";
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
import { useParams } from "react-router-dom";
import SuccesMsg from "../components/SuccesMsg";

const DaftarProgram = () => {
   const { idDesa } = useParams();

   // =====================
   // State utama
   // =====================
   const [namaDesa, setNamaDesa] = useState("");
   const [rows, setRows] = useState([]);
   const [tambahProgram, setTambahProgram] = useState(false);

   // =====================
   // Input form
   // =====================
   const [program, setProgram] = useState("");
   const [keterangan, setKeterangan] = useState("");
   const [tanggal, setTanggal] = useState("");
   const [jenisKegiatan, setJenisKegiatan] = useState("");
   const [sumberDana, setSumberDana] = useState("");
   const [alokasiDana, setAlokasiDana] = useState("");
   const [realisasiDana, setRealisasiDana] = useState("");
   const [status, setStatus] = useState("");
   const currentYear = new Date().getFullYear();
   const years = Array.from(new Array(50), (val, index) => currentYear - index);

   // =====================
   // State notifikasi sukses
   // =====================
   const [isSuccesInput, setIsSuccesInput] = useState(false);
   const [successMsg, setSuccessMsg] = useState("");

   // =====================
   // State hapus program
   // =====================
   const [isDeleteProgram, setIsDeleteProgram] = useState(false);
   const [selectedProgramId, setSelectedProgramId] = useState(null);

   // =====================
   // Dialog tambah program
   // =====================
   const dialogTambahProgram = () => setTambahProgram(true);
   const tutupDialogTammbahProgram = () => setTambahProgram(false);

   // =====================
   // Fungsi ambil nama desa
   // =====================
   const getNamaDesa = async () => {
      try {
         const response = await axios.get(
            `http://localhost:3000/desa/${idDesa}`,
            {
               withCredentials: true,
            }
         );
         setNamaDesa(response.data.nama_desa);
      } catch (error) {
         console.error(error);
      }
   };

   // =====================
   // Fungsi ambil data program by desa
   // =====================
   const getDataByDesa = async () => {
      try {
         const response = await axios.get(
            `http://localhost:3000/program/desa/${idDesa}`,
            { withCredentials: true }
         );
         setRows(response.data);
      } catch (error) {
         console.error("Error fetching data:", error);
      }
   };

   // =====================
   // Tambah data program
   // =====================
   const submitTambahProgram = async (e) => {
      e.preventDefault();
      try {
         const response = await axios.post(
            `http://localhost:3000/program`,
            {
               program,
               keterangan,
               tanggal,
               jenisKegiatan,
               sumberDana,
               alokasiDana,
               realisasiDana,
               status,
               idDesa,
            },
            { withCredentials: true }
         );

         setSuccessMsg(response.data.msg);
         setIsSuccesInput(true);
         setTambahProgram(false);

         await getDataByDesa();

         setTimeout(() => setIsSuccesInput(false), 2000);
      } catch (error) {
         console.error(error);
      }
   };

   // =====================
   // Hapus program (dialog dan aksi)
   // =====================
   const deleteProgram = (progId) => {
      setSelectedProgramId(progId);
      setIsDeleteProgram(true);
   };

   const closeDeleteProgram = () => {
      setIsDeleteProgram(false);
      setSelectedProgramId(null);
   };

   const agreeDeleteProgram = async () => {
      try {
         if (!selectedProgramId) return;
         const response = await axios.delete(
            `http://localhost:3000/program/${selectedProgramId}`,
            { withCredentials: true }
         );
         console.log(response);
         setIsDeleteProgram(false);
         await getDataByDesa();
      } catch (error) {
         console.error(error);
      }
   };

   // =====================
   // Columns DataGrid
   // =====================
   const columns = [
      { field: "program", headerName: "Nama Program", width: 200 },
      { field: "jenis_kegiatan", headerName: "Jenis Kegiatan", width: 200 },
      // { field: "sumber_dana", headerName: "Sumber Dana", width: 150 },
      // {
      //    field: "alokasi_dana",
      //    headerName: "Alokasi Dana",
      //    width: 150,
      //    renderCell: (params) => {
      //       const value = Number(params.value); // pastikan number

      //       if (isNaN(value)) return "Rp 0";

      //       return (
      //          <span>
      //             {new Intl.NumberFormat("id-ID", {
      //                style: "currency",
      //                currency: "IDR",
      //                minimumFractionDigits: 0,
      //             }).format(value)}
      //          </span>
      //       );
      //    },
      // },
      // {
      //    field: "realisasi_dana",
      //    headerName: "Realisasi Dana",
      //    width: 150,
      //    renderCell: (params) => {
      //       const value = Number(params.value); // pastikan number

      //       if (isNaN(value)) return "Rp 0";

      //       return (
      //          <span>
      //             {new Intl.NumberFormat("id-ID", {
      //                style: "currency",
      //                currency: "IDR",
      //                minimumFractionDigits: 0,
      //             }).format(value)}
      //          </span>
      //       );
      //    },
      // },
      { field: "tanggal", headerName: "Tanggal Kegiatan", width: 200 },
      { field: "status", headerName: "Status", width: 150 },
      {
         field: "verifikasi",
         headerName: "Verifikasi",
         align: "center",
         headerAlign: "center",
         width: 150,
         renderCell: (params) => {
            const verification = params.value?.toString().trim().toLowerCase();

            if (!verification || verification === "null") {
               return (
                  <div className="w-full h-full flex items-center justify-center">
                     <div className="px-3 py-1 rounded-full bg-gray-400 text-white text-sm">
                        Belum
                     </div>
                  </div>
               );
            } else if (verification === "telah diverifikasi") {
               return (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                     <div className="px-3 py-1 rounded-full text-white text-sm bg-green-600 ">
                        Disetujui
                     </div>
                  </div>
               );
            } else if (verification === "ditolak") {
               return (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                     <div className="px-3 py-1 rounded-full text-white text-sm bg-red-600 ">
                        Ditolak
                     </div>
                  </div>
               );
            }
         },
      },

      // {
      //    field: "keterangan",
      //    headerName: "Keterangan",
      //    width: 200,
      //    editable: true,
      // },
      // {
      //    field: "file",
      //    headerName: "Dokumen",
      //    headerAlign: "center",
      //    align: "center",
      //    width: 100,
      //    renderCell: (params) => {
      //       if (!params.value) return <BlockIcon />;

      //       return (
      //          <a
      //             href={`http://localhost:3000${params.value}`}
      //             download
      //             style={{ color: "#1976d2", textDecoration: "underline" }}
      //          >
      //             Lihat
      //          </a>
      //       );
      //    },
      // },
      {
         field: "aksi",
         headerName: "Aksi",
         headerAlign: "center",
         width: 250,
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
                  variant="contained"
                  sx={{ backgroundColor: "#c22131", color: "white" }}
                  onClick={() => deleteProgram(params.id)}
               >
                  <DeleteForeverIcon />
               </Button>
            </Box>
         ),
      },
   ];

   // =====================
   // useEffect
   // =====================
   useEffect(() => {
      getNamaDesa();
      getDataByDesa();
   }, []);

   // =====================
   // Render
   // =====================
   return (
      <>
         <Box sx={{ height: 800, width: "100%" }}>
            {/* Alert sukses input */}
            {isSuccesInput && <SuccesMsg message={successMsg} />}

            <Typography
               sx={{
                  fontSize: "30px",
                  marginY: "20px",
                  fontWeight: "light",
               }}
            >
               Data Program Desa{" "}
               <span className="font-semibold">{namaDesa}</span>
            </Typography>

            <Button
               sx={{
                  width: "10%",
                  backgroundColor: "#1976d2",
                  color: "white",
                  marginY: "20px",
                  textTransform: "none",
                  fontSize: "14px",
                  "&:hover": {
                     backgroundColor: "#1259a5",
                  },
               }}
               onClick={dialogTambahProgram}
            >
               Tambah
            </Button>

            <DataGrid
               rows={rows}
               columns={columns}
               initialState={{
                  pagination: {
                     paginationModel: { pageSize: 20 },
                  },
               }}
               pageSizeOptions={[20]}
               checkboxSelection
               disableRowSelectionOnClick
               sx={{
                  fontFamily: "Montserrat, sans-serif",
                  "& .MuiDataGrid-cell": {
                     fontSize: "12px", // isi tabel
                     padding: "4px 8px",
                  },
                  "& .MuiDataGrid-columnHeaders": {
                     fontSize: "12px", // header kolom
                     backgroundColor: "#e3f2fd", // biru muda
                     fontWeight: "bold",
                  },
                  "& .MuiDataGrid-row:nth-of-type(odd)": {
                     backgroundColor: "#fafafa", // zebra row
                  },
                  "& .MuiDataGrid-row:hover": {
                     backgroundColor: "#e8f0fe", // efek hover lembut
                  },
                  "& .MuiDataGrid-columnSeparator": {
                     display: "none", // hilangkan garis pemisah header
                  },
                  "& .MuiDataGrid-columnHeaderTitle": {
                     whiteSpace: "normal",
                     lineHeight: "1.2",
                  },
               }}
            />
         </Box>

         {/* ===================== */}
         {/* Dialog Tambah Program */}
         {/* ===================== */}
         <Dialog
            open={tambahProgram}
            onClose={tutupDialogTammbahProgram}
            fullWidth
            maxWidth={false}
            sx={{ "& .MuiDialog-paper": { width: "50vw", maxWidth: "none" } }}
         >
            <DialogTitle>Tambah Program Desa</DialogTitle>
            <DialogContent>
               <DialogContentText>
                  Silahkan tambahkan program untuk desa tujuan , dengan ini
                  menyatakan kemerdekaan indonesia yng bersatu berdaulat adil
                  dan
               </DialogContentText>

               <form
                  id="subscription-form"
                  className="flex flex-col justify-start items-start gap-3 my-3"
                  onSubmit={submitTambahProgram}
               >
                  <div className="w-full flex flex-col justify-start items-start gap-2">
                     <label className="font-semibold">Nama Program</label>
                     <input
                        type="text"
                        className="w-full outline-none px-4 py-2 border-b-[1px] border-gray-300"
                        placeholder="Masukkan nama program"
                        value={program}
                        onChange={(e) => setProgram(e.target.value)}
                     />
                  </div>

                  <div className="w-full flex flex-col justify-start items-start gap-2">
                     <label className="font-semibold">Jenis Kegiatan</label>
                     <select
                        className="w-full outline-none px-4 py-2 border-b-[1px] border-gray-300"
                        placeholder="Masukkan keterangan"
                        onChange={(e) => setJenisKegiatan(e.target.value)}
                     >
                        <option value=""> -Silahkan Pilih- </option>
                        <option value="pembangunan">Pembangunan </option>
                        <option value="pemberdayaan">Pemberdayaan </option>
                        <option value="administrasi">Administrasi </option>
                     </select>
                  </div>

                  <div className="w-full flex flex-col justify-start items-start gap-2">
                     <label className="font-semibold">Sumber Dana</label>
                     <input
                        className="w-full outline-none px-4 py-2 border-b-[1px] border-gray-300"
                        placeholder="Masukkan keterangan"
                        value={sumberDana}
                        onChange={(e) => setSumberDana(e.target.value)}
                     />
                  </div>

                  <div className="w-full flex flex-col justify-start items-start gap-2">
                     <label className="font-semibold">Alokasi Dana</label>
                     <input
                        className="w-full outline-none px-4 py-2 border-b-[1px] border-gray-300"
                        placeholder="Masukkan keterangan"
                        value={alokasiDana}
                        onChange={(e) => setAlokasiDana(e.target.value)}
                     />
                  </div>

                  <div className="w-full flex flex-col justify-start items-start gap-2">
                     <label className="font-semibold">Realisasi Dana</label>
                     <input
                        className="w-full outline-none px-4 py-2 border-b-[1px] border-gray-300"
                        placeholder="Masukkan keterangan"
                        value={realisasiDana}
                        onChange={(e) => setRealisasiDana(e.target.value)}
                     />
                  </div>

                  <div className="w-full flex flex-col justify-start items-start gap-2">
                     <label className="font-semibold">Tanggal Kegiatan</label>
                     <input
                        type="date"
                        className="w-full outline-none px-4 py-2 border-b-[1px] border-gray-300 text-sm"
                        value={tanggal}
                        onChange={(e) => setTanggal(e.target.value)}
                     />
                  </div>

                  <div className="w-full flex flex-col justify-start items-start gap-2">
                     <label className="font-semibold">Status</label>
                     <select
                        className="w-full outline-none px-4 py-2 border-b-[1px] border-gray-300"
                        placeholder="Masukkan keterangan"
                        onChange={(e) => setStatus(e.target.value)}
                     >
                        <option value=""> -Silahkan Pilih- </option>
                        <option value="sedang">Sedang Dilaksanakan</option>
                        <option value="akan">Akana Dilaksanakan</option>
                        <option value="telah">Telah Dilaksanakan</option>
                     </select>
                  </div>

                  <div className="w-full flex flex-col justify-start items-start gap-2">
                     <label className="font-semibold">Keterangan</label>
                     <textarea
                        className="w-full outline-none px-4 py-2 border border-gray-300 h-40 "
                        placeholder="Masukkan keterangan"
                        value={keterangan}
                        onChange={(e) => setKeterangan(e.target.value)}
                     />
                  </div>

                  {/* <div className="w-full flex flex-col justify-start items-start gap-2 outline-none">
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
                  </div> */}

                  <DialogActions sx={{ marginY: "30px" }}>
                     <Button onClick={tutupDialogTammbahProgram}>Cancel</Button>
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

         {/* ===================== */}
         {/* Dialog Konfirmasi Hapus */}
         {/* ===================== */}
         <Dialog
            open={isDeleteProgram}
            onClose={closeDeleteProgram}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
         >
            <DialogTitle id="alert-dialog-title">
               {"HAPUS PROGRAM?"}
            </DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-description">
                  Yakin ingin menghapus program ini?
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={closeDeleteProgram}>Batal</Button>
               <Button onClick={agreeDeleteProgram} autoFocus>
                  Hapus
               </Button>
            </DialogActions>
         </Dialog>
      </>
   );
};

export default DaftarProgram;
