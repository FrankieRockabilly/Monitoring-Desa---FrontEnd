import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SuccessMsg  from '../components/SuccesMsg'
import ErrorMsg from '../components/ErrorMsg'

const ProfileSetting = () => {
    const [name,setName] = useState()
    const [username,setUsername] = useState()
    const [password,setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [userId, setUserId] = useState()
    const [successEdit, setSuccessEdit] = useState(false)
    const [errorEdit, setErrorEdit] = useState(false)
    const [message, setMessage] = useState(false)

    const Me = async()=>{
        try {
            const response = await axios.get('http://localhost:3000/me', {withCredentials :true})
            setName (response.data.name)
            setUsername (response.data.name)
            setUserId(response.data.id)
            // console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const updateUser=async (e)=>{
        e.preventDefault()
        try {
            const response = await axios.patch(`http://localhost:3000/user/${userId}`,{
                name,
                username,
                password,
                confirmPassword
            }, {withCredentials : true})
            setSuccessEdit(true)
            setMessage(response.data.msg)
            console.log(response.data);
        } catch (error) {
            console.log(error);
            setErrorEdit(true)
            setMessage(error.response.data.msg)
        }
    }

    useEffect(()=>{
        Me()
    })

  return (
    <>
    <div className='flex flex-col justify-start items-start gap-5'>
        {successEdit && <SuccessMsg message={message} />}
        {errorEdit && <ErrorMsg message={message} />}
        <div className="flex flex-col justify-start items-start w-full border rounded-xl shadow-xl p-10 bg-white">
            <div className="w-full flex flex-col justify-start items-start gap-10 mb-5">
               <div className="w-full flex flex-col justify-start items-start gap-5">
                  <h1 className="font-bold text-4xl">Edit Profil</h1>
                  <p>Update your profile to personalize your account </p>
               </div>
            </div>
        </div>
        <div className="flex flex-col justify-start items-start w-full border rounded-xl shadow-xl p-10 bg-white">
            <div className="w-full flex flex-col justify-start items-start gap-10 mb-5">
               <div className="w-full flex flex-col justify-start items-start gap-5">
                <div className='flex justify-between items-center w-full'>
                    <div>
                        <h1 className="font-bold text-4xl">Informasi Pribadi</h1>
                        <p>Update your profile to personalize your account </p>
                    </div>
                    <div>
                        <h1 className="border p-3 rounded-lg shadow-md text-xl">Edit</h1>
                    </div>
                </div>

                  <form className='flex flex-col justify-start items-start gap-10 w-full ' onSubmit={updateUser}>
                    <div className='w-full flex justify-between items-center gap-10'>
                        <div className='w-full'>
                            <label>Nama</label>
                            <input type="text" className='px-5 py-3 outline-none border rounded-md w-full shadow-sm'
                            value={name}
                            onChange={(e)=>setName(e.target.value)} />
                        </div>
                        <div className='w-full'>
                            <label>Username</label>
                            <input type="text" className='px-5 py-3 outline-none border rounded-md w-full shadow-sm'
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)} />
                        </div>
                    </div>

                    <div className='w-full'>
                        <label>Password Baru</label>
                        <input type="password" className='px-5 py-3 outline-none border rounded-md w-full shadow-sm'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)} />
                    </div>

                    <div className='w-full'>
                        <label>Konfirmasi Password Baru</label>
                        <input type="password" className='px-5 py-3 outline-none border rounded-md w-full shadow-sm'
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)} />
                    </div>

                    <button type='submit' className='px-5 py-3 rounded-md bg-blue-900 text-white'>Simpan Perubahan</button>
                    
                  </form>
               </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default ProfileSetting