import axios from 'axios'
import React, { useEffect, useState } from 'react'

// icons MUI
import EmailIcon from '@mui/icons-material/Email';
import { Divider } from '@mui/material';

const Home = () => {


  return (
     <>
        <div className="py-24">
           <div className="flex flex-wrap justify-start items-center gap-10">
              {/* 1 */}
              <div className="w-[25rem] p-5 border flex flex-col text-right gap-10 rounded-xl shadow-lg relative">
                 {/* icon messge */}
                 <div className="absolute -top-10 w-24 h-24 bg-fuchsia-600 rounded-md flex justify-center items-center">
                    <EmailIcon fontSize="large" sx={{ color: "white" }} />
                 </div>
                 <div>
                    <h2 className="text-3xl font-semibold">Data Desa</h2>
                    <p>10</p>
                 </div>
                 <div className="text-left">
                    <Divider sx={{ width: "100%" }} />
                    <p className="pt-4 text-sm">Jumlah Desa</p>
                 </div>
              </div>

              {/* 2 */}
              <div className="w-[25rem] p-5 border flex flex-col text-right gap-10 rounded-xl shadow-lg relative">
                 {/* icon messge */}
                 <div className="absolute -top-10 w-24 h-24 bg-pink-500 rounded-md flex justify-center items-center">
                    <EmailIcon fontSize="large" sx={{ color: "white" }} />
                 </div>
                 <div>
                    <h2 className="text-3xl font-semibold">Program Desa</h2>
                    <p>10</p>
                 </div>
                 <div className="text-left">
                    <Divider sx={{ width: "100%" }} />
                    <p className="pt-4 text-sm">Jumlah Program Desa</p>
                 </div>
              </div>

              {/* 3 */}
              <div className="w-[25rem] p-5 border flex flex-col text-right gap-10 rounded-xl shadow-lg relative">
                 {/* icon messge */}
                 <div className="absolute -top-10 w-24 h-24 bg-orange-500 rounded-md flex justify-center items-center">
                    <EmailIcon fontSize="large" sx={{ color: "white" }} />
                 </div>
                 <div>
                    <h2 className="text-3xl font-semibold">Laporan Desa</h2>
                    <p>10</p>
                 </div>
                 <div className="text-left">
                    <Divider sx={{ width: "100%" }} />
                    <p className="pt-4 text-sm">Jumlah Laporan Desa</p>
                 </div>
              </div>
           </div>
        </div>
     </>
  );
}

export default Home