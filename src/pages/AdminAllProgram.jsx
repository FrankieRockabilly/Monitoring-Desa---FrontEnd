import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, List, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


export default function AdminAllProgram() {
  const [rows, setRows]  = React.useState([])
  const [isOpenDetailDialog, setIsOpenDetailDialog] = useState(false)
  const openDetailDialog = ()=>{
    setIsOpenDetailDialog(true)
  }

  const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

  const getAllDatas = async()=>{
    try {
      const response = await axios.get('http://localhost:3000/program',  {withCredentials : true})
      console.log(response);
      setRows(response.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getAllDatas()
  },[])

  const columns = [
    { field: 'jenis_kegiatan', headerName: 'Jenis Kegiatan', width: 200 },
    { field: 'alokasi_dana', headerName: 'Alokasi Dana', width: 200 ,
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
    { field: 'tanggal', headerName: 'tanggal dibuat', width: 200 },
    { field: 'nama_desa', headerName: 'Nama Desa', width: 200 },
    { field: 'detail', headerName: 'Detail', width: 200,align : 'center',headerAlign :'center',
      renderCell : (params) =>{
        return (
          <div>
            <button onClick={openDetailDialog}>Details</button>
          </div>
        )
      }
     },
  
  ];


  return (
    <Box sx={{ height: 400, width: '100%' }}>
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


      

      <Dialog
        open={isOpenDetailDialog}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setIsOpenDetailDialog(false)}>Disagree</Button>
          <Button > autoFocus
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>


  );
}
