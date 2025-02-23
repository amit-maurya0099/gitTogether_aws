import React from 'react'
import LoadingImg from "../assets/LoadingImage.gif"

const Loader = () => {
  return (
    <div className='h-full w-full flex items-center justify-center '>
       <img src={LoadingImg} alt="/loader" className='object-cover h-[40%]'></img>
    </div>
  )
}

export default Loader
