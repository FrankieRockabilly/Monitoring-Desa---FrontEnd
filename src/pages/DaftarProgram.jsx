import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  const [tahun, setTahun] = useState("");

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
      const response = await axios.get(`http://localhost:3000/desa/${idDesa}`, {
        withCredentials: true,
      });
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
          tahun,
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
        `http://localhost:3000/program/${selectedProgramId}`,{withCredentials:true}
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
    { field: "program", headerName: "Nama Program", width: 250 },
    {
      field: "keterangan",
      headerName: "Keterangan",
      width: 600,
      editable: true,
    },
    {
      field: "tahun",
      headerName: "Tahun",
      width: 200,
      editable: true,
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
            sx={{ backgroundColor: "darkred", color: "white" }}
            onClick={() => deleteProgram(params.id)}
          >
            Hapus Program
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
          sx={{ fontSize: "30px", marginY: "20px", fontWeight: "light" }}
        >
          Data Program Desa <span className="font-semibold"> {namaDesa}</span>
        </Typography>

        <Button
          sx={{ width: "10%", backgroundColor: "#1976d2", color: "white" , marginY:'20px' }}
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
        />
      </Box>

      {/* ===================== */}
      {/* Dialog Tambah Program */}
      {/* ===================== */}
     <Dialog open={tambahProgram} onClose={tutupDialogTammbahProgram}fullWidth maxWidth={false}sx={{'& .MuiDialog-paper': {width: '50vw', maxWidth: 'none',  },}}>
        <DialogTitle>Tambah Program Desa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Silahkan tambahkan program untuk desa tujuan , dengan ini menyatakan kemerdekaan indonesia yng bersatu berdaulat adil dan
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
              <label className="font-semibold">Keterangan Singkat</label>
              <textarea
                className="w-full outline-none px-4 py-2 border border-gray-300 h-40"
                placeholder="Masukkan keterangan"
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
              />
            </div>

            <div className="w-full flex flex-col justify-start items-start gap-2">
              <label className="font-semibold">Tahun</label>
              <input
                type="text"
                className="w-full outline-none px-4 py-2 border-b-[1px] border-gray-300"
                placeholder="Tahun program"
                value={tahun}
                onChange={(e) => setTahun(e.target.value)}
              />
            </div>

            <DialogActions sx={{marginY:"30px"}}>
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
        <DialogTitle id="alert-dialog-title">{"HAPUS PROGRAM?"}</DialogTitle>
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
