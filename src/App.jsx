import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material'

import Frame from './components/frame'

// PAGE
import Home from './pages/Home'
import Desa from './pages/desa'
import Program from './pages/Program'
import Laporan from './pages/Laporan'
import Login from './pages/Login'
import EditDesa from './pages/EditDesa'
import TambahProgram from './pages/TambahProgram'
import AddProgramList from './pages/AddProgramList'

const App = ()=>{

  const theme = createTheme ({
    typography :{
      fontFamily : ["Montserrat", "sans-serif"].join(","),
      pallette :{
        red : "#8E000"
      }
    }
  })

  return (
            <ThemeProvider theme={theme}>
              <BrowserRouter>
                  <Routes>
                      <Route path='/' element = { <Login /> }/>
                    <Route element = { <Frame />} >
                      <Route path='/beranda' element = { <Home /> }/>
                      <Route path='/desa' element = { <Desa /> }/>
                      <Route path='/editDesa/:id' element = { <EditDesa /> }/>
                      <Route path='/program' element = { <Program /> }/>
                      <Route path='/tambahProgram/:id' element = { <TambahProgram /> }/>
                      <Route path='/programList' element = { <AddProgramList /> }/>
                      <Route path='/laporan' element = { <Laporan /> }/>
                    </Route>
                  </Routes>
                </BrowserRouter>
              </ThemeProvider>
  )
}

export default App
