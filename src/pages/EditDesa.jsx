import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SuccesMsg from './SuccesMsg'
import ErrorMsg from './ErrorMsg'

const EditDesa = () => {
    const{id} = useParams()
    const navigate = useNavigate()

    const [namaDesa, setNamaDesa] = useState()
    const [kecamatan, setKecamatan] = useState()
    const [alamat, setAlamat] = useState()
    const [kontak, setKontak] = useState()

    const [loading, setLoading] = useState(false)
    const[succesEdit, setSucessEdit] = useState(false)
    const[successMessage, setSuccessMessage] = useState('')

    const[errorEdit,setErrorEdit] =useState(false)
    const[errorMsg,setErrorMsg] =useState('')
    

    const getDesaById = async()=>{
        const response = await axios.get(`http://localhost:3000/desa/${id}`,{withCredentials:true})
        console.log(response.data);
        setNamaDesa(response.data.nama_desa)
        setKecamatan(response.data.kecamatan)
        setAlamat(response.data.alamat)
        setKontak(response.data.kontak)
    }
    useEffect(()=>{
        getDesaById()
    },[])

    const submitEditDesa = async(e) =>{
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.patch(`http://localhost:3000/desa/${id}`,{
                namaDesa : namaDesa,
                alamat : alamat,
                kontak : kontak,
                kecamatan : kecamatan 
            }, 
            {withCredentials:true})
            console.log(response.data.msg);
            setSuccessMessage(response.data.msg);
            setLoading(false)
            setSucessEdit(true)
            setTimeout(() => {
                navigate('/desa')
                setSucessEdit(false)
            }, 2000);
        } catch (error) {
            console.log(error);
            setErrorEdit(true)
        }finally{
            setLoading(false)
        }
    }

  return (
    <>
        <div className='relative'>
            {/* alert */}
            {succesEdit &&(
                <SuccesMsg message={successMessage}/>
            )}

            {errorEdit && (
                <ErrorMsg />
            )}
            
            <h1 className='font-medium text-2xl'>Edit Desa Guys</h1>
            <form className='my-10 flex flex-col justify-start items-start gap-5' onSubmit={(e)=>submitEditDesa(e)}>
                <div className='w-full flex flex-col justify-start items-start gap-1 '>
                    <label>Nama Desa</label>
                     <input
                        type="text"
                        className="w-full px-4 py-3 border rounded"
                        placeholder="Masukkan Nama Desa"
                        value={namaDesa}
                        onChange={(e) => setNamaDesa(e.target.value)}
                        required
                        />
                </div>
                
                <div className='w-full flex flex-col justify-start items-start gap-1 '>
                    <label>Kecamatan</label>
                     <input
                        type="text"
                        className="w-full px-4 py-3 border rounded"
                        placeholder="Masukkan Kecamatan"
                        value={kecamatan}
                        onChange={(e) => setKecamatan(e.target.value)}
                        required
                        />
                </div>
                
                <div className='w-full flex flex-col justify-start items-start gap-1 '>
                    <label>Alaamat</label>
                     <input
                        type="text"
                        className="w-full px-4 py-3 border rounded"
                        placeholder="Masukkan alamat"
                        value={alamat}
                        onChange={(e) => setAlamat(e.target.value)}
                        required
                        />
                </div>
                
                <div className='w-full flex flex-col justify-start items-start gap-1 '>
                    <label>Kontak</label>
                     <input
                        type="text"
                        className="w-full px-4 py-3 border rounded"
                        placeholder="Contoh +62 8xxx xxx"
                        value={kontak       }
                        onChange={(e) => setKontak(e.target.value)}
                        required
                        />
                </div>
                <div className='w-full flex justify-end text-center gap-3'>
                    <button type='button' className='rounded-lg text-center px-3 py-2 bg-red-700 text-white' onClick={()=> navigate('/desa')}>Batal</button>
                    <button type='submit' className='bg-green-600 rounded-lg text-center px-3 py-2 text-white'>{loading ? "..." : 'Update'} </button>
                </div>
            </form>
        </div>
    </>
  )
}

export default EditDesa