import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SuccesMsg from '../components/SuccesMsg'

const TambahProgram = () => {

    const [allDesa, setAllDesa] = useState([])

    const[desa, setDesa] = useState('')
    const[jenisKegiatan, setJenisKegiatan] = useState('')
    const[program, setProgram] = useState('')
    const[alokasiDana, setAlokasiDana] = useState('')
    const[keterangan, setKeterangan] = useState('')
    const[tanggal, setTanggal] = useState('')
    const[selectedFile, setSelectedFile] = useState('')



    // suksess??
    const [suksesSubmitProgram, setSuksesSubmitProgram] = useState(false)
    const [message, setMesssage] = useState(false)


    // ===========
    // submit program
    // ============
     const submitProgram = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("namaDesa", desa);
      formData.append("jenisKegiatan", jenisKegiatan);
      formData.append("program", program);
      formData.append("alokasiDana", alokasiDana);
      formData.append("keterangan", keterangan);
      formData.append("status", 'pending');
      formData.append("tanggal", tanggal);
      formData.append("file", selectedFile);

      try {
         const response = await axios.post(
            "http://localhost:3000/program",
            formData,
            {
               withCredentials: true,
            }
         );
         console.log(response.data)
         setSuksesSubmitProgram(true)
         setMesssage(response.data.msg)
         setTimeout(() => {
            setDesa("");
            setJenisKegiatan("");
            setProgram("");
            setAlokasiDana("");
            setKeterangan("");
            setTanggal("");
            setSelectedFile("");
            setSuksesSubmitProgram(false)
         }, 2000);
        //  setMesssage(response.data.msg);
      } catch (error) {
         console.log(error);
      }
   };

    const getDesa = async()=>{
        try {
            const response =  await axios.get('http://localhost:3000/desa' ,{withCredentials:true})
            console.log(response.data);
            setAllDesa(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getDesa()
    },[])

  return (
    <>
        <div className='flex justify-center items-center w-full border rounded-xl shadow-xl p-10'>
            {suksesSubmitProgram && (
                <SuccesMsg  message={message}/>
            )}
            <div className='w-full flex flex-col justify-start items-start gap-10 '>
                <div className='w-full flex flex-col justify-start items-start gap-5'>
                    <h1 className='font-bold text-4xl'>Tambah Program</h1>
                    <p>Fill in the details of the village program you want to submitt</p>
                </div>

                {/* input field */}
                    <form  className='flex flex-col justify-center items-center gap-5 w-full' onSubmit={submitProgram}>
                        <div className='w-full flex justify-center items-center gap-5'>
                            <div className='w-full'>
                                <label htmlFor="">Nama Desa</label>
                                <div>
                                <select className='border border-gray-300 shadow-md rounded-xl outline-none w-full px-3 py-3' placeholder='Masukkan Nama Desa'
                                onChange={(e)=>setDesa(e.target.value)}>
                                    <option value=""> -Pilih Desa- </option>
                                    {allDesa.length > 0 ? (
                                        allDesa.map((value) => (
                                        <option key={value.id} value={value.nama_desa}>
                                            {value.nama_desa}
                                        </option>
                                        ))
                                    ) : (
                                        <option>Loading...</option>
                                    )}
                                    </select>
                                </div>

                            </div>
                            <div className='w-full'>
                                <label htmlFor="">Jenis Program</label>
                                <div>
                                    <select className='border border-gray-300 shadow-md rounded-xl outline-none w-full px-3 py-3' placeholder='Masukkan Nama Desa' value={jenisKegiatan}
                                    onChange={(e) => setJenisKegiatan(e.target.value)} >
                                        <option value="">-Pilih Jenis Program-</option>
                                        <option value="pembangunan">Pembangunan</option>
                                        <option value="infrastruktur">Infrastruktur</option>
                                        <option value="agrikultur">Agrikultur</option>
                                        <option value="sosial">Sosial</option>
                                        <option value="skilltraining">Skill Training</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex justify-center items-center gap-5'>
                            <div className='w-full'>
                                <label htmlFor="">Nama Program *</label>
                                <input type="text" className='border border-gray-300 shadow-md rounded-xl outline-none w-full px-3 py-3' placeholder='Masukkan Nama Program / Kegiatan'
                                value={program}
                                onChange={(e)=>setProgram(e.target.value)}
                                />
                            </div>
                            <div className='w-full'>
                                <label htmlFor="">Alokasi Dana</label>
                                <input type="text" className='border border-gray-300 shadow-md rounded-xl outline-none w-full px-3 py-3' placeholder='Rp. '
                                value={alokasiDana}
                                onChange={(e)=>setAlokasiDana(e.target.value)}/>
                            </div>
                        </div>

                        <div className='w-full'>
                            <label htmlFor="">Tanggal Program</label>
                            <input type="date" className='border border-gray-300 shadow-md rounded-xl outline-none w-full px-3 py-3' placeholder='Masukkan Jenis Program / Kegiatan'
                            value={tanggal}
                            onChange={(e)=>setTanggal(e.target.value)}/>
                        </div>
                        <div className='w-full'>
                            <label htmlFor="">Keterangan</label>
                            <textarea type="text" className='h-40 border border-gray-300 shadow-md rounded-xl outline-none w-full px-3 py-3' placeholder='Masukkan Jenis Program / Kegiatan'
                            value={keterangan}
                            onChange={(e)=>setKeterangan(e.target.value)}/>
                        </div>
                        <div className='w-full'>
                            <label>File pendukung </label>
                            <input type="file" className='border border-gray-300 shadow-md rounded-xl outline-none w-full px-3 py-3' placeholder='Masukkan Jenis Program / Kegiatan'
                            onChange={(e)=>setSelectedFile(e.target.files[0])}/>
                        </div>
                        
                        <button type='submit' className='w-full bg-blue-800 rounded-xl text-white py-3'>Kirim</button>
                    </form>
            </div>
        </div>
    </>
  )
}

export default TambahProgram