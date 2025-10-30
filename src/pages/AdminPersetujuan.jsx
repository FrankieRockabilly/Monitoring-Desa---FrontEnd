import axios from 'axios'
import React, { useEffect, useState } from 'react'


// icons
import CurrencyExchangeTwoToneIcon from '@mui/icons-material/CurrencyExchangeTwoTone';
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import SuccessMsg from "../components/SuccesMsg";
import ErrorMsg from "../components/ErrorMsg";

const AdminPersetujuan = () => {
   const [pendingProgram, setPendingProgram] = useState([]);
   const [selectedProgram, setSelectedProgram] = useState();
   const [successUpdate, setSuccessUpdate] = useState(false);
   const [errorUpdate, setErrorUpdate] = useState(false);

   // ======
   // open dialog untuk YES
   // =====
   const [isSetuju, setIsSetuju] = useState(false);
   const [isTolak, setIsTolak] = useState(false);
   const [message, setMessage] = useState("");

   const handleClickSetuju = (id) => {
      setIsSetuju(true);
      setSelectedProgram(id);
      // console.log('id nya adalah :' ,id);
   };
   const handleClickTolak = (id) => {
      setIsTolak(true);
      setSelectedProgram(id);
      // console.log('id nya adalah :' ,id);
   };

   const closeConfirmSetuju = () => {
      setIsSetuju(false);
   };
   const closeConfirmTolak = () => {
      setIsTolak(false);
   };

   const getData = async () => {
      try {
         const response = await axios.get("http://localhost:3000/program", {
            withCredentials: true,
         });
         setPendingProgram(
            response.data.filter((item) => item.verifikasi == "pending")
         );
         // console.log(response.data.filter((item)=>item.status == 'pending'));
      } catch (error) {
         console.log(error);
      }
   };

   // update persetujuan status = disetujui
   const updateStatusSetuju = async () => {
      try {
         const response = await axios.patch(
            `http://localhost:3000/program/${selectedProgram}`,
            {
               verifikasi: "disetujui",
            },
            { withCredentials: true }
         );
         // console.log(response.data);
         setIsSetuju(false);
         setSuccessUpdate(true);
         setMessage(response.data.msg);
         await getData();
      } catch (error) {
         console.log(error);
         setErrorUpdate(true);
         setMessage(error.response.data.msg);
      }
   };
   const updateStatusTolak = async () => {
      try {
         const response = await axios.patch(
            `http://localhost:3000/program/${selectedProgram}`,
            {
               verifikasi: "ditolak",
            },
            { withCredentials: true }
         );
         // console.log(response.data);
         setIsTolak(false);
         setSuccessUpdate(true);
         setMessage(response.data.msg);
         await getData();
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getData();
   }, []);
   return (
      <>
         <div className="flex flex-col justify-center items-center w-full border rounded-xl shadow-xl p-10 bg-white ">
            {successUpdate && <SuccessMsg message={message} />}
            {errorUpdate && <ErrorMsg message={message} />}
            <div className="w-full flex flex-col justify-start items-start gap-10 mb-5">
               <div className="w-full flex flex-col justify-start items-start gap-2">
                  <h1 className="font-bold text-2xl">Menunggu Persetujuan</h1>
                  <p className="text-gray-500">
                     Review and approve or reject pending program submissions
                  </p>
               </div>

               <div className="flex flex-wrap justify-center items-center gap-10 w-full">
                  {pendingProgram.length === 0 ? (
                     <p className="font-semibold text-lg">
                        Tidak ada data program pending
                     </p>
                  ) : (
                     pendingProgram.map((value) => {
                        return (
                           <div
                              className="w-full border rounded-lg shadow-md text-xs "
                              key={value.id}
                           >
                              <div className="p-5 bg-gradient-to-tr from-amber-50 to-white flex justify-between items-start">
                                 <div className="w-full text-sm">
                                    <h2 className="text-base font-semibold uppercase">
                                       {value.program} - {value.nama_desa}{" "}
                                    </h2>
                                    <p>{value.jenis_kegiatan} </p>
                                    <p className="font-light text-[11px]">
                                       Submit by :{value.user.name}{" "}
                                    </p>
                                 </div>

                                 {!value.file ? (
                                    <p className="text-gray-400 italic">
                                       Kosong
                                    </p>
                                 ) : (
                                    <a
                                       href={`http://localhost:3000${value.file}`}
                                       download
                                       target="_blank"
                                       rel="noopener noreferrer"
                                    >
                                       <button className="w-32 bg-blue-900 text-white rounded-md p-1 hover:bg-blue-700 transition">
                                          Lihat File
                                       </button>
                                    </a>
                                 )}
                              </div>
                              <div className="flex flex-col justify-start items-start">
                                 <div className="w-full p-5">
                                    <p className="text-sm">Deskripsi</p>
                                    <p className="text-xs">
                                       {value.keterangan}{" "}
                                    </p>
                                 </div>
                                 <div className="flex justify-around items-center w-full gap-5 p-5 ">
                                    {/* 1 */}
                                    <div className="w-full p-5 border rounded-md flex justify-start items-center gap-3">
                                       <CurrencyExchangeTwoToneIcon />
                                       <div>
                                          <p>Budget</p>
                                          <p>
                                             {value.alokasi_dana?.toLocaleString(
                                                "id-ID",
                                                {
                                                   style: "currency",
                                                   currency: "IDR",
                                                }
                                             )}
                                          </p>
                                       </div>
                                    </div>

                                    <div className="w-full p-5 border rounded-md flex justify-start items-center gap-3">
                                       <CalendarTodayTwoToneIcon />
                                       <div>
                                          <p>Tanggal Program</p>
                                          <p>{value.tanggal} </p>
                                       </div>
                                    </div>

                                    <div className="w-full flex flex-col justify-between gap-2 items-center  ">
                                       <button
                                          className="flex justify-center items-center gap-3 h-full w-full rounded-md bg-green-700 text-white p-2"
                                          onClick={() =>
                                             handleClickSetuju(value.id)
                                          }
                                       >
                                          <CheckCircleOutlineTwoToneIcon
                                             sx={{ fontSize: "15px" }}
                                          />
                                          <p>Setujui</p>
                                       </button>
                                       <button
                                          className="flex justify-center items-center gap-3 h-full w-full rounded-md border border-red-500 text-red-500 p-2"
                                          onClick={() =>
                                             handleClickTolak(value.id)
                                          }
                                       >
                                          <CloseTwoToneIcon
                                             sx={{ fontSize: "15px" }}
                                          />
                                          <p>Tolak</p>
                                       </button>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        );
                     })
                  )}
               </div>
            </div>
         </div>

         {/*  dialog confirmasi*/}
         <Dialog
            open={isSetuju}
            onClose={closeConfirmSetuju}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
         >
            <DialogTitle id="alert-dialog-title">
               {"Setujui Program ini ?"}
            </DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-description">
                  Konfirmasi persetujuan program untuk approve program yang
                  telah diajukan
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={closeConfirmSetuju}>Cancel</Button>
               <Button onClick={updateStatusSetuju} autoFocus>
                  Setuju
               </Button>
            </DialogActions>
         </Dialog>

         {/* dialog kalau di tolak */}
         <Dialog
            open={isTolak}
            onClose={closeConfirmTolak}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
         >
            <DialogTitle id="alert-dialog-title">
               {"Tolak Program ini ?"}
            </DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-description">
                  Konfirmasi untuk tolak program yang diajukan ?
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={closeConfirmTolak}>Cancel</Button>
               <Button onClick={updateStatusTolak} autoFocus>
                  Tolak
               </Button>
            </DialogActions>
         </Dialog>
      </>
   );
};

export default AdminPersetujuan