import { useState } from 'react'
import profile from '../assets/profile.png'
import { useNavigate } from 'react-router-dom';

// icons from react icons
import { FaUserAlt, FaKey,FaEye,FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { Alert, Button } from '@mui/material';
import SuccessAlert from "../alerts/SuccessAlert";
import ErrorAlert from "../alerts/ErrorAlert";

const Login = () => {
   const navigate = useNavigate();

   const [username, setUsername] = useState();
   const [password, setPassword] = useState();
   const [hidePassword, setHidePassword] = useState(false);

   const [errorLogin, setErrorLogin] = useState(false);
   const [succesLogin, setSuccesLogin] = useState(false);
   const [loading, setLoading] = useState(false);

   const [message, setMessage] = useState("");

   const handleHidePassword = (e) => {
      e.preventDefault();
      setHidePassword(!hidePassword);
   };

   const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         const response = await axios.post(
            "http://localhost:3000/login",
            {
               username: username,
               password: password,
            },
            {
               withCredentials: true,
            }
         );
         console.log(response);
         setSuccesLogin(true);
         setMessage("Berhasil Login");
         setTimeout(() => {
            setSuccesLogin(false);
            navigate("/beranda");
         }, 3000);
      } catch (error) {
         setErrorLogin(true);
        setMessage(error.response.data.msg);
        setLoading(false);
        setTimeout(() => {
           setErrorLogin(false);
        }, 2000);
      } finally {
         setLoading(false);
      }
   };

   return (
      <>
         <div className="w-full h-screen flex justify-center items-center shadow-lg px-20 py-20 bg-purple-100 relative">
            {/* jika sukses login */}
            {succesLogin && <SuccessAlert message={message} />}
            {errorLogin && <ErrorAlert message={message} />}
            {/* jika gagal login */}
            {errorLogin && (
               <Alert
                  variant="filled"
                  severity="error"
                  className="absolute top-5 left-20 w-auto"
               >
                  {errorLogin}
               </Alert>
            )}
            <div className="flex justify-between items-center w-full h-full bg-white rounded-3xl shadow-2xl">
               {/*kiri  */}
               <div className="w-[60%] h-full flex  justify-center items-center ">
                  <div className="flex flex-col justify-start items-start gap-5">
                     <h1 className="font-bold text-5xl">Login</h1>

                     <form
                        className="my-5 flex flex-col justify-start items-start gap-5"
                        onSubmit={handleLogin}
                     >
                        <div className="px-4 py-3 w-[30rem] bg-gray-200 flex justify-start items-center gap-5 rounded-full border border-violet-900 ">
                           <FaUserAlt size={20} />
                           <input
                              type="text"
                              className="w-full outline-none bg-none bg-gray-200 rounded-lg"
                              placeholder="Username"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              required
                           />
                        </div>

                        <div className="px-4 py-3 w-[30rem] bg-gray-200 flex justify-between items-center gap-5 rounded-full border border-violet-900 ">
                           <FaKey size={20} />
                           <input
                              type={hidePassword ? "text" : "password"}
                              className="w-full outline-none bg-none bg-gray-200 rounded-lg"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                           />
                           <button onClick={handleHidePassword}>
                              {hidePassword ? (
                                 <FaEye size={23} />
                              ) : (
                                 <FaEyeSlash size={23} />
                              )}
                           </button>
                        </div>
                        {/* <button type='submit' className='my-10 w-full bg-violet-900 rounded-full px-3 py-4 text-white text-lg'>
                    {loading ? <Button loading variant="outlined">Submit</Button> : 'Log In'}
                  </button> */}
                        <Button
                           sx={{
                              width: "100%",
                              borderRadius: "30px",
                              paddingY: "10px",
                              marginY: "20px",
                              backgroundColor: "#1218b5",
                              color: "white",
                           }}
                           type="submit"
                           loading={loading}
                           variant={loading ? "outlined" : "contained"}
                        >
                           Login
                        </Button>
                     </form>
                  </div>
               </div>
               {/* kanan */}
               <div
                  className="w-full h-full p-10 flex flex-1 flex-col justify-start items-end gap-3 text-white bg-vioborder-violet-900 border border-red-300 rounded-e-3xl font-poppins"
                  style={{
                     backgroundImage: `url(${profile})`,
                     backgroundPosition: "left",
                     backgroundSize: "cover",
                  }}
               >
                  <h1 className="text-4xl font-bold text-right tracking-wide">
                     Sistem Monitoring Desa Berbasis Web{" "}
                  </h1>
                  <p className="text-gray-400 text-xl">Kecamatan Ujung Batu</p>
               </div>
            </div>
         </div>
      </>
   );
};

export default Login