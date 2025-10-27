import axios from 'axios'
import React, { useState } from 'react'
import BarChart from '../components/BarChart'

const AdminAnalisis = () => {


  return (
    <>
      <div className="flex flex-col justify-start items-start w-full border rounded-xl shadow-xl p-10 bg-white">
            <div className="w-full flex flex-col justify-start items-start gap-10 mb-5">
               <div className="w-full flex flex-col justify-start items-start gap-5">
                  <h1 className="font-bold text-4xl">Analisis dan Laporan</h1>
                  <p>Comprehensice insights into program performance </p>
               </div>
            </div>

            {/* chart js */}
            <div className=' w-[80%] flex justify-center items-center gap-5'>
              <BarChart />
            </div>
      </div>
    </>
  )
}

export default AdminAnalisis