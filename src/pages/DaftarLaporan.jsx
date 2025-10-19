import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useParams } from 'react-router-dom'
import SuccessAlert from '../alerts/SuccessAlert';
import SuccesMsg from '../components/SuccesMsg';

const DaftarLaporan = () => {
    const {idDesa} = useParams()
    const [rows, setRows]  = useState([])

    // form field
    const[judul, setJudul] = useState()
    const[isi, setIsi] = useState()
    const[tanggal, setTanggal] = useState()

    const[succesInputLaporan, setSuccessInputLaporan] = useState(false)
    const[message,setMesssage]  = useState('')

    const[selectedLaporan, setSelectedLaporan] = useState()
    const [confirmDeleteLaporan, setConfirmDeleteLaporan] = useState(false)

    const isDeleteLaporan =(idLaporan)=>{
      setSelectedLaporan(idLaporan)
      setConfirmDeleteLaporan(true)
      // alert(idLaporan)
    }

    // =====================
    // ambil data dari id Desa untuk dihapus
    // =====================
    const getLaporanByIdDesa = async()=>{
        try {
            const response= await axios.get(`http://localhost:3000/laporan/desa/${idDesa}`, {withCredentials:true})
            console.log(response.data);
            setRows(response.data)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(()=>{
        getLaporanByIdDesa()
    },[])


    // =====================
    // function tambah laporan
    // =====================
    const [tambahLaporan , setTambahLaporan] = useState(false)
    const tutupDialogLaporan =()=>{
        setTambahLaporan(false)
    }
     
    const submitLaporan = async(e)=>{
      e.preventDefault()
      try {
        const response = await axios.post('http://localhost:3000/laporan', {
          judul : judul,
          isi :isi,
          tanggal : tanggal,
          idDesa : idDesa

        }, {withCredentials:true})
        setTambahLaporan(false)
        // console.log(response.data)
        setSuccessInputLaporan(true)
        await getLaporanByIdDesa()
        setTimeout(() => {
          setSuccessInputLaporan(false)
        }, 2000);
        setMesssage(response.data.msg)
      } catch (error) {
        console.log(error);
      }
    }

    // =====================
    // function hapus laporan
    // =====================
    const deleteLaporan = async()=>{
      try {
        const response = await axios.delete(`http://localhost:3000/laporan/${selectedLaporan}`, {withCredentials:true})
        console.log(response)
        setConfirmDeleteLaporan(false)
        await getLaporanByIdDesa()
      } catch (error) {
        console.log(error)
      }
    }
    


    const columns = [
      {
         field: "id",
         headerName: "No",
         width: 100,
        //  renderCell : (params)=> {return params.api.getRowNode(params.id).id + 1;}
      },
      {
         field: "judul",
         headerName: "Judul Laporan",
         width: 200,
      },
      {
         field: "isi",
         headerName: "isi Laporan",
         width: 450,
      },
      {
         field: "tanggal",
         headerName: "Tanggal",
         width: 200,
      },
      {
         field: "userId",
         headerName: "Dibuat Oleh",
         width: 150,
      },
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
            sx={{ backgroundColor: "#ed1520", color: "white" }}
            onClick={()=>isDeleteLaporan(params.id)}
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

          {succesInputLaporan && <SuccesMsg message={message}/>}

            <Typography
                sx={{ fontSize: "30px", marginY: "20px", fontWeight: "light" }}
            >
                Data Laporan guys
            </Typography>
            <Button sx={{ width: "10%", backgroundColor: "#1976d2", color: "white" , marginY:'20px' }} onClick={()=>setTambahLaporan(true)} >
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

        // =====================
        // dialog modal tambah laporan
        // =====================

        <Dialog open={tambahLaporan} onClose={tutupDialogLaporan}fullWidth maxWidth={false}sx={{'& .MuiDialog-paper': {width: '50vw', maxWidth: 'none',  },}}>
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
              <label className="font-semibold">Keterangan Singkat</label>
              <textarea
                className="w-full outline-none px-4 py-2 border border-gray-300 h-40"
                placeholder="Masukkan keterangan"
                value={isi}
                onChange={(e) => setIsi(e.target.value)}
              />
            </div>

            <div className="w-full flex flex-col justify-start items-start gap-2">
              <label className="font-semibold">Tahun</label>
              <input
                type="text"
                className="w-full outline-none px-4 py-2 border-b-[1px] border-gray-300"
                placeholder="Tahun program"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
              />
            </div>

            <DialogActions sx={{marginY:"30px"}}>
              <Button onClick={()=>setTambahLaporan(false)}>Cancel</Button>
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


        // =====================
        // dialog confirm delete laporan ?
        // =====================
      <Dialog
        open={confirmDeleteLaporan}
        onClose={()=>setConfirmDeleteLaporan(false)}
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
          <Button onClick={()=>setConfirmDeleteLaporan(false)}>Disagree</Button>
          <Button onClick={deleteLaporan} autoFocus>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>


        </div>
    </>
  )
}

export default DaftarLaporan