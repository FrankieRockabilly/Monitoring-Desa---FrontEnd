import React, { useEffect } from 'react'
import gsap from 'gsap'

const SuccesMsg = ({message}) => {

  useEffect(()=>{
    gsap.fromTo('.effect',
      { x : 30, duration :1, opacity:0 ,ease :'power1'} ,
      {x:0 , opacity:1 }
    )
  },[])

  return (
    <>
      <div className='absolute top20 right-0 bg-green-700 text-white rounded-lg px-5 py-2 z-20 effect'>
        <p>{message} </p>
      </div>
    </>
  )
}

export default SuccesMsg