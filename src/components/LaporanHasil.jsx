import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SuccesMsg from './SuccesMsg'


const LaporanHasil = () => {

    const[desa, setDesa]= useState([])

    const [namaDesa, setNamaDesa] = useState('')
    const [sumberDana, setSumberDana] = useState('')
    const [realisasiDana, setRealisasiDana] = useState('')
    const [jenisKegiatan, setJenisKegiatan] = useState('')
    const [tanggal, setTanggal] = useState('')
    const [keterangan, setKeterangan] = useState('')
    const [file, setFile] = useState('')
    
    const[loading, setLoading] = useState(false)

    const [successSubmit , setSuccessSubmit]  = useState(false)
    const [message , setMesssage]  = useState('')

    // ===== dapat kan desa======
    const getDesa = async()=>{
        try {
            const response = await axios.get('http://localhost:3000/desa', {withCredentials:true})
            setDesa(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    // ======= submit laporan
    const submitLaporan = async (e)=>{
        e.preventDefault()

        setLoading(true)

        const formData = new FormData()
        formData.append('namaDesa', namaDesa )
        formData.append('sumberDana', sumberDana )
        formData.append('realisasiDana', realisasiDana )
        formData.append('jenisKegiatan', jenisKegiatan )
        formData.append('tanggal', tanggal )
        formData.append('keterangan', keterangan )
        formData.append('file', file )


        try {
            const response = await axios.post(`http://localhost:3000/laporan`, formData, {withCredentials : true})
            console.log(response.data);
            setSuccessSubmit(true)
            setMesssage(response.data.msg)
            setLoading(false)
            setTimeout(() => {
                setSuccessSubmit(false)
                setNamaDesa('')
                setSumberDana('')
                setRealisasiDana('')
                setJenisKegiatan('')
                setTanggal('')
                setKeterangan('')
                setFile(null)
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(()=>{
        getDesa()
    },[])
 
  return (
    <>
        <div className=' bg-white'>
             {successSubmit && (
                <SuccesMsg message={message}/>
             )}

            <div className='text-white bg-black text-center p-3'>
                <p>Laporan Hasil</p>
            </div>
            <form className='py-5 flex flex-col gap-3' onSubmit={submitLaporan}>
                <div className="flex justify-center items-center gap-20 w-full ">
                    <div className='w-full'>
                        <label>Desa yang dikunjungi</label>
                        <select className='w-full px-3 py-2 rounded-lg border outline-none'placeholder='nomor surat tugas' onChange={(e)=>setNamaDesa(e.target.value)}>
                            <option value="">-pilih desa-</option>
                            {desa.length > 0 ? (
                                desa.map((item)=>(
                                    <option key={item.id} value={item.nama_desa}>{item.nama_desa} </option>
                                ))
                            ) :(
                                <option disabled>loading..</option>
                            )}
                        </select>
                    </div>
                    <div className='w-full'>
                        <label>Sumber Dana</label>
                        <input type="text"  className='w-full px-3 py-2 rounded-lg border outline-none' placeholder='Nama'
                        value={sumberDana}
                        onChange={(e)=>setSumberDana(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center gap-20 w-full ">
                    <div className='w-full'>
                        <label>Jenis Kegiatan</label>
                        <input type="text"  className='w-full px-3 py-2 rounded-lg border outline-none'placeholder='perjalanan dalam rangka'
                         value={jenisKegiatan}
                        onChange={(e)=>setJenisKegiatan(e.target.value)}/>
                    </div>
                    <div className='w-full'>
                        <label>Total Dana Di Alokasikan</label>
                        <input type="number"  className='w-full px-3 py-2 rounded-lg border outline-none' placeholder='Nama'
                         value={realisasiDana}
                        onChange={(e)=>setRealisasiDana(e.target.value)}/>
                    </div>
                </div>
                <div className='w-full'>
                    <label>Tanggal Perjalanan Dinas</label>
                    <input type="date"  className='w-full px-3 py-2 rounded-lg border outline-none' placeholder='tanggal'
                     value={tanggal}
                    onChange={(e)=>setTanggal(e.target.value)}/>
                </div>
                <div className='w-full'>
                    <label>Keterangan</label>
                    <textarea type="text"  className='w-full h-32 px-3 py-2 rounded-lg border outline-none' placeholder='keterangan'
                     value={keterangan}
                    onChange={(e)=>setKeterangan(e.target.value)}/>
                </div>
                <div className='w-full'>
                    <label>File Pendukung</label>
                    <input type="file"  className='w-full px-3 py-2 rounded-lg border outline-none' placeholder='input file'
                    onChange={(e)=>setFile(e.target.files[0])}/>
                </div>
                <button type='submit' className='w-64  py-3 bg-blue-800 rounded-md text-white hover:bg-blue-900'>{loading ? 'loading ...' : 'Kirim Laporan'} </button>
            </form>
        </div>
    </>
  )
}

export default LaporanHasil