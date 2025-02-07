import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Error = () => {
  
  return (

    <div className='h-full w-full flex justify-center items-center'>

        <div className=' mt-20 w-[90%] md:w-[40%] h-[60vh] flex flex-col justify-center items-center'>
            <p className='text-4xl text-blue-700'>404!</p>
            <h2 className='text-5xl text-white'>Page not Found</h2>
             <Link to ="/"> <button className='text-lg mt-4 font-semibold text-white bg-blue-700 cursor-pointer  py-1 px-4'>Back to Home</button></Link>
        </div>
      
    </div>
  )
}

export default Error
