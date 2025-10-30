import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material'
// import DaftarProgram from "./pages/DaftarProgram";
import Frame from "./components/Frame";

// PAGE
import Home from "./pages/Home";
import Desa from "./pages/Desa";
// import Program from "./pages/Program";
// import Laporan from "./pages/Laporan";
import Login from "./pages/Login";
import EditDesa from "./pages/EditDesa";
import DaftarLaporan from "./pages/DaftarLaporan";
import AdminAllProgram from "./pages/AdminAllProgram";
import TambahProgram from "./pages/TambahProgram";
import ListProgram from "./pages/ListProgram";
import AdminPersetujuan from "./pages/AdminPersetujuan";
import AdminAnalisis from "./pages/AdminAnalisis";
import TambahLaporan from "./pages/TambahLaporan";
import AdminLaporan from "./pages/AdminLaporan";
import LaporanDikirim from "./pages/LaporanDikirim";
import ProfileSetting from "./pages/ProfileSetting";
import EditProgram from "./pages/EditProgram";

const App = () => {
   const theme = createTheme({
      typography: {
         fontFamily: ["Montserrat", "sans-serif"].join(","),
         pallette: {
            red: "#8E000",
         },
      },
   });

   return (
      <ThemeProvider theme={theme}>
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Login />} />
               <Route element={<Frame />}>
                  <Route path="/beranda" element={<Home />} />
                  <Route path="/desa" element={<Desa />} />
                  <Route path="/editDesa/:id" element={<EditDesa />} />
                  <Route path="/addProggram" element={<TambahProgram />} />
                  <Route path="/editProgram/:id" element={<EditProgram />} />
                  <Route path="/addLaporan" element={<TambahLaporan />} />
                  <Route path="/laporanDikirim" element={<LaporanDikirim />} />
                  <Route path="/listProgram" element={<ListProgram />} />
                  <Route path="/adminLaporan" element={<AdminLaporan />} />
                  <Route
                     path="/admin/allProgram"
                     element={<AdminAllProgram />}
                  />
                  <Route
                     path="/admin/persetujuan"
                     element={<AdminPersetujuan />}
                  />
                  <Route
                     path="/daftarLaporan/:idDesa"
                     element={<DaftarLaporan />}
                  />
                  <Route path="/admin/analisis" element={<AdminAnalisis />} />

                  <Route path="/profileSetting" element={<ProfileSetting />} />
               </Route>
            </Routes>
         </BrowserRouter>
      </ThemeProvider>
   );
};

export default App
