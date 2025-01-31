import React from 'react';

import { useNavigate } from 'react-router-dom';

const Login = ({setCurrentView}) => {
  const navigate=useNavigate();
  return ( 
    <div className='flex justify-center items-center w-[90%] md:w-[25%] h-[70vh] mt-10 rounded-2xl no-scrollbar'>
    <div className="card bg-[#101828] shadow-sm  w-full h-full ">
      <h2 className='text-2xl font-bold text-center my-4 underline '>Login</h2>
      <form className='flex flex-col px-4 justify-center items-center gap-4'>
       <div className='w-[90%]' >
        <fieldset className="fieldset">
        <legend className="fieldset-legend text-lg">Email</legend>
        <input type="text" className="input w-full" placeholder="Enter your email" />
        </fieldset>
       </div>
       <div className='w-[90%]' >
        <fieldset className="fieldset">
        <legend className="fieldset-legend text-lg">Password</legend> 
        <input type="text" className="input w-full" placeholder="Enter your password" />
        </fieldset>
       </div>
       <div className="card-actions flex justify-center w-[90%] mt-6" >
      <button className="btn btn-primary w-full text-m ">Submit</button>
    </div>
     <div> <p >Don't have Account?<span className='text-blue-400 cursor-pointer' onClick={()=>setCurrentView('registerCard')}> Please Register!</span></p></div>
      </form>
  </div>
</div>
  )
}

export default Login
