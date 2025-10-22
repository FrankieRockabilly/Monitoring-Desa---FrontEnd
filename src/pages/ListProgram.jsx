import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import BlockIcon from "@mui/icons-material/Block";
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const ListProgram = () => {
    const [rows, setRows] = useState([])

    // get all program yang ada
    const getAllProgram = async()=>{
        try {
            const response = await axios.get('http://localhost:3000/program' ,{withCredentials :true})
            setRows(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getAllProgram()
    },[])


    const columns = [
  { field: 'nama_desa', headerName: 'Desa', width: 170 },
  { field: 'jenis_kegiatan', headerName: 'jenis Program', width: 200 },
  { field: 'program', headerName: 'Nama Program', width: 200 },
  {
    field: 'alokasi_dana',
    headerName: 'Budget',
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
  { field: 'realisasi_dana', headerName: 'Terealisasikan', width: 200,
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
                  target='blank'
                  download
                  style={{ color: "#1976d2", textDecoration: "underline" }}
               >
                  Lihat
               </a>
            );
         },
      },
  { field: 'status', headerName: 'Status', width: 200 , headerAlign :'center',
    renderCell: (params) => (
            <div className="w-full h-full flex flex-col items-center justify-center">
               <div
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                     params.row.status === "disetujui"
                        ? "bg-green-400"
                        : params.row.status === "pending"
                        ? "bg-gray-400"
                        : "bg-red-600"
                  }`}
               >
                  {params.value}
               </div>
            </div>
         ),
  },
  { field: 'keterangan', headerName: 'Deskripsi', width: 200 },


 
];

  return (
    <>
        <div className='flex flex-col justify-center items-center w-full border rounded-xl shadow-xl p-10'>
            <div className='w-full flex flex-col justify-start items-start gap-10 mb-5'>
                <div className='w-full flex flex-col justify-start items-start gap-5'>
                    <h1 className='font-bold text-4xl'>List Program Desa</h1>
                    <p>View and manage all your submitted programs</p>
                </div>
                <div className='w-full '>
                    <input type="text" className='border border-gray-300 outline-none w-full px-5 py-3  rounded-lg' placeholder='Search'/>
                </div>
            </div>

            <Box sx={{ height: 800, width: '100%' }}>
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
  )
}

export default ListProgram
