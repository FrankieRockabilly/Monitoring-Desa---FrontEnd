import React, { useState } from 'react'
import LaporanHasil from '../components/LaporanHasil'
import Monev from '../components/Monev'
import Sppd from '../components/Sppd'


// icons
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const TambahLaporan = () => {
    const[activeTab, setActiveTab] = useState('lhp')

  return (
    <>
       <div className='shadow-lg rounded-md border p-5 bg-white inline-block w-full'>
          <h1 className='font-semibold text-2xl'>Tambah Laporan</h1>
            <p className='text-gray-600'>Pilih Jenis Laporan yang akan dikirim</p>

            {/* Container Tabs */}
            <div className='flex items-center gap-2 bg-gray-200 rounded-lg p-1 mt-3 w-fit'>
              {/* Tab aktif */}
              <div className={`flex items-center gap-2 px-4 py-2 rounded-md shadow-sm cursor-pointer ${activeTab == 'lhp' ? 'bg-white' : ''}`} onClick={()=>setActiveTab('lhp')}>
                <span><AssignmentTurnedInIcon /> </span>
                <p className='font-medium'>LHP</p>
              </div>
              {/* Tab aktif */}
              <div className={`flex items-center gap-2 px-4 py-2 rounded-md shadow-sm cursor-pointer ${activeTab == 'monev' ? 'bg-white' : ''}`} onClick={()=>setActiveTab('monev')}>
                <span><LegendToggleIcon/> </span>
                <p className='font-medium'>Monev</p>
              </div>
              {/* Tab aktif */}
              <div className={`flex items-center gap-2  px-4 py-2 rounded-md shadow-sm cursor-pointer ${activeTab == 'sppd' ? 'bg-white' : ''}`} onClick={()=>setActiveTab('sppd')}>
                <span><DirectionsBikeIcon /> </span>
                <p className='font-medium'>Perjalanan Dinas</p>
              </div>

            </div>

            <div className='py-5'>
              {activeTab == 'lhp' && <LaporanHasil /> }
              {activeTab == 'monev' && <Monev /> }
              {activeTab == 'sppd' && <Sppd /> }
            </div>
        </div>

    </>
  )
}

export default TambahLaporan