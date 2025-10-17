import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { FaEye } from "react-icons/fa";
import {
  Typography,
  Chip,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Program() {
  const [rows, setRows] = useState([]);
  const [openDialogProgram, setOpenDialogProgram] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState([]); // 🔥 simpan program dari desa yang diklik
  const [selectedDesa, setSelectedDesa] = useState(null); // untuk tampilkan nama desanya

  const openProgram = (row) => {
    setSelectedProgram(row.programs || []); // ambil data program dari desa yang diklik
    setSelectedDesa(row.nama_desa);
    setOpenDialogProgram(true);
  };

  const handleClose = () => {
    setOpenDialogProgram(false);
    setSelectedProgram([]);
    setSelectedDesa(null);
  };

  const getDataProgram = async () => {
    try {
      const response = await axios.get("http://localhost:3000/programDesa", {
        withCredentials: true,
      });
      console.log("Data dari API:", response.data);

      const formattedData = (response.data || []).map((item) => {
        const programs = Array.isArray(item.programs)
          ? item.programs.map((p) => ({
              nama: p.program || "-",
              ket: p.keterangan || "-",
              tahun: p.tahun || "-",
            }))
          : [];

        return {
          id: item.id,
          nama_desa: item.nama_desa || "-",
          kecamatan: item.kecamatan || "-",
          alamat: item.alamat || "-",
          kontak: item.kontak || "-",
          programs,
        };
      });

      setRows(formattedData);
    } catch (error) {
      console.error("Gagal memuat data:", error);
    }
  };

  const tambahProgram =(desaId)=>{
    console.log(`id desa = ${desaId}`)
  }

  useEffect(() => {
    getDataProgram();
  }, []);

  const columns = [
    { field: "nama_desa", headerName: "Nama Desa", width: 200 },
    { field: "kecamatan", headerName: "Kecamatan", width: 180 },
    { field: "alamat", headerName: "Alamat", width: 200 },
    {
      field: "show",
      headerName: "Program",
      headerAlign: 'center',
      width: 300,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        if (!params || !params.row) return null;
        return (
          <div className="flex justify-center items-center" >
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "#1976d2",
                color: "#fff",
                textTransform: "none",
                "&:hover": { backgroundColor: "#1565c0" },
                mx: "auto",
              }}
              onClick={() => openProgram(params.row)} // ⬅️ kirim data row ke fungsi
            >
              Lihat
            </Button>

            <Link to={`/tambahProgram/${params.id}`}>
              <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "#11c243",
                  color: "#fff",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#11782e" },
                  mx: "auto",
                }}
                // onClick={() => tambahProgram(params.id)} 
              >
                Lihat Detail
              </Button>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 500, width: "100%", p: 2 }}>
      <Typography sx={{ fontSize: "1.5rem", fontWeight: "600", mb: 2 }}>
        Data Program Desa
      </Typography>

      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
      />

      {/* Dialog Program */}
      <Dialog
        open={openDialogProgram}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Program Desa {selectedDesa ? `"${selectedDesa}"` : ""}
        </DialogTitle>

        <DialogContent dividers>
          {selectedProgram.length > 0 ? (
            <Stack spacing={2}>
              {selectedProgram.map((prog, i) => (
                <Box
                  key={i}
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    p: 2,
                    bgcolor: "#f9f9f9",
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    {prog.nama}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tahun: {prog.tahun}
                  </Typography>
                  <Typography variant="body2">
                    Keterangan: {prog.ket}
                  </Typography>
                </Box>
              ))}
            </Stack>
          ) : (
            <Typography
              align="center"
              color="text.secondary"
              sx={{ py: 3, fontStyle: "italic" }}
            >
              Belum ada program untuk desa ini.
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
