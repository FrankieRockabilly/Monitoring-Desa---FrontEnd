import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';

// icons
import { FiPlus } from "react-icons/fi";
import SuccesMsg from './SuccesMsg';


export default function TambahProgram() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [rows, setRows] =useState([])
    const [listProgram, setListProgram]= useState([])
    const [openDialog, setOpenDialog] = useState(false)

    // dialog list program full
    const[openListPrograms, setOpenListPrograms] = useState(false)
    const openListProgram = ()=>{
      setOpenListPrograms(true)
    }
    const closeListProgram =()=>{
      setOpenListPrograms(false)
    }

    // input program baru
    const[program, setProgram] = useState()
    const[keterangan, setKeterangan] = useState()
    const[tahun, setTahun] = useState()

    const[succesInputProgramBaru, setSuccesInputProgramBaru] = useState(false)
    const[successMsg, setSuccessMsg] = useState('')

    const [successInsertProgram, setSuccessInsertProgram] = useState(false)

    const tambahProgramList =()=>{
      setOpenDialog(true)
    }
    const handleClose =()=>{
      setOpenDialog(false)
    }

    
    const getDataProgramById = async()=>{
      try {
        const response = await axios.get(`http://localhost:3000/programDesa/${id}`, {withCredentials:true})
        // console.log(response.data);
        setRows(response.data.programs)
      } catch (error) {
        console.log(error)
      }
    }


    // list semua program
    const getProgram = async()=>{
      try {
        const response = await axios.get('http://localhost:3000/program', {withCredentials : true})
        setListProgram(response.data)
      } catch (error) {
        console.log(error.message)
      }
    }
    // simpan data yang baru input

    const simpanProgram =async (e)=>{
      e.preventDefault()
      try {
        const response = await axios.post('http://localhost:3000/program',
          {
            program : program,
            keterangan :keterangan,
            tahun : tahun
          }, 
        {withCredentials : true})
        console.log(response.data)
        setSuccessMsg(response.data.message)
        setOpenDialog(false)
        setSuccesInputProgramBaru(true)
        setTimeout(() => {
          setProgram('')
          setKeterangan('')
          setTahun('')
          setSuccesInputProgramBaru(false)
        }, 2000);
      } catch (error) {
        setOpenDialog(false)
        console.log(error);
      }
    }

    const masukkanKeProgam =async (programId)=>{
      try {
        const response = await axios.post(`http://localhost:3000/programDesa` ,{
          desaId : id,
          programId : programId
        }, {withCredentials:true})
        setSuccessInsertProgram(true)
        setOpenListPrograms(false)
        setSuccessMsg(response.data.message)
        await getDataProgramById()
        setTimeout(() => {
          setSuccessInsertProgram(false)
        }, 2000);
        // console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }

    useEffect(()=>{
      getProgram()
    },[])

    useEffect(()=>{
        getDataProgramById()
    },[])

    const columns = [
  { field: 'id', headerName: 'Id', width: 90 },
  { field: 'program', headerName: 'Program', width: 200 },
  { field: 'keterangan', headerName: 'Keterangan', width: 500 },
  { field: 'tahun', headerName: 'Tahunn', width: 100 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 180,
    headerAlign: 'center',
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Box sx={{ display: 'flex',justifyContent: 'center',alignItems: 'center', width: '100%',height: '100%', }} >
        <Button sx={{ padding: '7px', backgroundColor: 'red', color: 'white', textTransform: 'none', }} > Hapus</Button>
      </Box>
    )
  }
];



  return (
    <Box sx={{ height: 800, width: '100%' }}>
      {succesInputProgramBaru && (
        <SuccesMsg message={successMsg}/>
      )}
      
      {successInsertProgram && (
        <SuccesMsg message={successMsg}/>
      )}

       <Typography sx={{ fontSize: '1.5rem', fontWeight: '600' }}>
          List Program
        </Typography>
        <div className='w-full flex justify-between items-center'>
          <Button sx={{marginY:'10px'}} variant="contained" onClick={tambahProgramList}>Program Baru</Button>
          <Button sx={{marginY:'10px', backgroundColor:"green"}} variant="contained" onClick={openListProgram}>List Program</Button>
        </div>
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

      {/* dialog tambah list program */}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Tambah  List Program</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tambahkan data program yang belum di list untuk menambahkan program ke desa tujuan
          </DialogContentText>
          <form  id="subscription-form" className='w-full flex flex-col justify-start items-start gap-2 my-5' onSubmit={simpanProgram}>
              <div className='w-full flex flex-col justify-start items-start gap-2  '>
                <label>Nama Program</label>
                <input type="text" className='w-full px-5 py-2 outline-none bg-gray-200 rounded-md'
                value={program}
                onChange={(e)=>setProgram(e.target.value)}
                required
                />
              </div>
              
              <div className='w-full flex flex-col justify-start items-start gap-2  '>
                <label>Keterangan</label>
                <input type="text" className='w-full px-5 py-2 outline-none bg-gray-200 rounded-md'
                value={keterangan}
                onChange={(e)=>setKeterangan(e.target.value)}
                required/>
              </div>
              <div className='w-full flex flex-col justify-start items-start gap-2  '>
                <label>Tahun</label>
                <input type="text" className='w-full px-5 py-2 outline-none bg-gray-200 rounded-md'
                value={tahun}
                onChange={(e)=>setTahun(e.target.value)}
                required/>
              </div>

              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button sx={{backgroundColor:'blue',color:'white'}} type="submit" form="subscription-form">
                  Tambah
                </Button>
              </DialogActions>
              
          </form>
        </DialogContent>
      </Dialog>


      {/* dialog untuk memunculkan list program desa */}
        <Dialog
          open={openListPrograms}
          onClose={closeListProgram}
          aria-labelledby="alert-dialog-title"
          maxWidth={false} // penting! supaya tidak dibatasi ukuran 'sm', 'md', dll
          PaperProps={{
            style: {
              width: '60rem', // sesuai lebar tabel yang kamu mau
            },
          }}
        >
          <DialogTitle id="alert-dialog-title">
            List Program
          </DialogTitle>

          <DialogContent>
            <div className="w-full">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-y border-gray-300">
                    <th className="py-2 text-left">No</th>
                    <th className="py-2 text-left w-[15rem]">Program</th>
                    <th className="py-2 text-left w-[30rem]">Keterangan</th>
                    <th className="py-2 w-[10rem] text-center">Tahun</th>
                    <th className="py-2 w-[10rem] border text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {listProgram.map((value, index) => (
                    <tr key={value.id} className="border-y border-gray-200 text-sm">
                      <td className="py-2">{index + 1}</td>
                      <td className="py-2">{value.program}</td>
                      <td className="py-2">{value.keterangan}</td>
                      <td className="py-2 text-center">{value.tahun}</td>
                      <td className="py-2 border text-center">
                        <button className=" px-3 py-2 text-white bg-blue-600 rounded-lg" onClick={()=>masukkanKeProgam(value.id)}>
                          <FiPlus />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DialogContent>

          <DialogActions>
            <Button onClick={closeListProgram}>Close</Button>
          </DialogActions>
        </Dialog>

    </Box>
  );
}
