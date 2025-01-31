import React from 'react'
import { useNavigate } from 'react-router-dom'
import BgImg from "../assets/BgImg.png"
const Register = ({setCurrentView}) => {
    const navigate=useNavigate();
  return (
    <div className='w-[90%] md:w-[35%] h-[70vh] mt-10 bg-[#101828] rounded-xl shadow-2xl no-scrollbar'>
         <h2 className='text-2xl font-bold text-center my-4 underline'>Register</h2>
         <form className=' flex flex-col gap-4 items-center justify-center '>
          <div className='flex flex-col gap-4 items-center  md:flex md:flex-row md:justify-evenly md:items-center w-full text-base' >
            
                <input className=' w-[80%] md:w-[40%] border-t-0 border-r-0 rounded-l-xl border-b-gray-500 pl-2 py-0.5  outline-none' placeholder='firstname'></input>
                
                <input className='w-[80%] md:w-[40%] border-r-0 rounded-l-xl border-t-0 border-b-gray-500 pl-2 py-0.5  border-gray-600 outline-none' placeholder='lastname'></input>
       
          </div>
          <div className='flex flex-col gap-4 items-center  md:flex md:flex-row md:justify-evenly w-full text-base' >
            
                <input className='w-[80%] md:w-[40%] border-t-0 border-r-0 rounded-l-xl border-b-gray-500 pl-2 py-0.5  outline-none' placeholder='Email'></input>
                
                <input className='w-[80%] md:w-[40%] border-r-0 rounded-l-xl border-t-0 border-b-gray-500 pl-2 py-0.5  border-gray-600 outline-none' placeholder='Password'></input>
          </div>
          <div className='flex flex-col gap-4 items-center  md:flex md:flex-row md:justify-evenly w-full text-base' >
            
                <input className='w-[80%] md:w-[40%] border-t-0 border-r-0 rounded-l-xl border-b-gray-500 pl-2 py-0.5  outline-none' placeholder='Skills'></input>
                
                <input className='w-[80%] md:w-[40%] border-r-0 rounded-l-xl border-t-0 border-b-gray-500 pl-2 py-0.5  border-gray-600 outline-none' placeholder='About'></input>
       
          </div>
          <div className='flex flex-col gap-4 items-center  md:flex md:flex-row md:justify-evenly w-full text-base' >
            
                <input className='w-[80%] md:w-[40%] border-t-0 border-r-0 rounded-l-xl border-b-gray-500 pl-2 py-0.5  outline-none' placeholder='Github url'></input>
                
                <input className='w-[80%] md:w-[40%] border-r-0 rounded-l-xl border-t-0 border-b-gray-500 pl-2 py-0.5  border-gray-600 outline-none' placeholder='LinkedIn Url'></input>
       
          </div>

      <div className=' flex justify-center gap-2 w-full my-2 ' >
            <label className='text-white px-3 text-base bg-blue-500 rounded-xl'>Profile</label>
            <input type='file' className='w-[40%] border-t-0 border-r-0 rounded-l-xl border-b-gray-500 pl-2 cursor-pointer outline-none'></input>
        
      </div>
         
          <div className='w-full px-[10%]' >
            <button className='w-full py-1 text-lg bg-blue-700 text-white rounded-xl cursor-pointer'>Register</button>
          </div>
          
    
        <div> <p >Already have Account?<span className='text-blue-400 cursor-pointer' onClick={()=>setCurrentView('loginCard')}> Please Login!</span></p></div>
         </form>
     </div>
  
  )
}

export default Register
