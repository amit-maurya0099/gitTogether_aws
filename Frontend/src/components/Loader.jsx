import React from 'react'
import LoadingImg from "../assets/LoadingImg.gif"

const Loader = () => {
  return (
    <div className='h-full w-full flex items-center justify-center '>
       <img src={LoadingImg} alt="/loader" className='object-cover'></img>
    </div>
  )
}

export default Loader
