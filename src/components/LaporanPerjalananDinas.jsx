import React from 'react'

const LaporanPerjalananDinas = () => {
  return (
    <>
        <div className='px-5'>
            <div className='text-white bg-black text-center p-3'>
                <p>Laporan Perjalanan Dinas</p>
            </div>
            <form className='py-5 flex flex-col gap-3'>
                <div className="flex justify-center items-center gap-20 w-full ">
                    <div className='w-full'>
                        <label>Nomor</label>
                        <input type="text"  className='w-full px-3 py-2 rounded-lg border outline-none'placeholder='nomor surat tugas'/>
                    </div>
                    <div className='w-full'>
                        <label>Nama</label>
                        <input type="text"  className='w-full px-3 py-2 rounded-lg border outline-none' placeholder='Nama'/>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-20 w-full ">
                    <div className='w-full'>
                        <label>Judul Tugas</label>
                        <input type="text"  className='w-full px-3 py-2 rounded-lg border outline-none'placeholder='perjalanan dalam rangka'/>
                    </div>
                    <div className='w-full'>
                        <label>Tanggal Pelaksanaan</label>
                        <input type="date"  className='w-full px-3 py-2 rounded-lg border outline-none' placeholder='Nama'/>
                    </div>
                </div>
                <div className='w-full'>
                    <label>Hasil Pelaksanaan Tugas</label>
                    <textarea type="date"  className='w-full h-60 px-3 py-2 rounded-lg border outline-none' placeholder='Nama'/>
                </div>
                <div className='w-full'>
                    <label>File Pendukung</label>
                    <input type="file"  className='w-full px-3 py-2 rounded-lg border outline-none' placeholder='input file'/>
                </div>
                <button type='submit' className='w-64  py-3 bg-blue-800 rounded-md text-white hover:bg-blue-900'>Kirim Laporan</button>
            </form>
        </div>
    </>
  )
}

export default LaporanPerjalananDinas