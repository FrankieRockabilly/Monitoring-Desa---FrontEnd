import React from 'react'

// icons
import TextSnippetIcon from '@mui/icons-material/TextSnippet';



const AdminLaporan = () => {
  return (
    <>
        <div className="flex flex-col justify-start items-start w-full border rounded-xl shadow-xl p-10 bg-white min-h-max">
            <div className="w-full flex flex-col justify-start items-start gap-10 mb-5">
               <div className="w-full flex flex-col justify-start items-start gap-5">
                  <h1 className="font-bold text-4xl">Laporan Detail</h1>
                  <p>Comprehensice insights into program performance </p>
               </div>
            </div>
            <div className="flex justify-around items-center gap-10">
                    {/* 1 */}
                <div className='border shadow-md rounded-md p-10 flex justify-between items-center gap-28'>
                    <div className='flex flex-col justify-start items-start gap-2'>
                        <h1 className='font-semibold text-gray-700'>Total laporan</h1>
                        <p className='text-2xl font-semibold'>8</p>
                    </div> 
                    <div className='bg-blue-50 p-5 rounded-lg'>
                        <TextSnippetIcon sx={{color :'blue'}}/>
                    </div>
                </div>
                <div className='border shadow-md rounded-md p-10 flex justify-between items-center gap-28'>
                    <div className='flex flex-col justify-start items-start gap-2'>
                        <h1 className='font-semibold text-gray-700'>Total laporan</h1>
                        <p className='text-2xl font-semibold'>8</p>
                    </div> 
                    <div className='bg-blue-50 p-5 rounded-lg'>
                        <TextSnippetIcon sx={{color :'blue'}}/>
                    </div>
                </div>
                <div className='border shadow-md rounded-md p-10 flex justify-between items-center gap-28'>
                    <div className='flex flex-col justify-start items-start gap-2'>
                        <h1 className='font-semibold text-gray-700'>Total laporan</h1>
                        <p className='text-2xl font-semibold'>8</p>
                    </div> 
                    <div className='bg-blue-50 p-5 rounded-lg'>
                        <TextSnippetIcon sx={{color :'blue'}}/>
                    </div>
                </div>
                <div className='border shadow-md rounded-md p-10 flex justify-between items-center gap-28'>
                    <div className='flex flex-col justify-start items-start gap-2'>
                        <h1 className='font-semibold text-gray-700'>Total laporan</h1>
                        <p className='text-2xl font-semibold'>8</p>
                    </div> 
                    <div className='bg-blue-50 p-5 rounded-lg'>
                        <TextSnippetIcon sx={{color :'blue'}}/>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default AdminLaporan