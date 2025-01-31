import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({setCurrentView}) => {
  const navigate=useNavigate();
    const [user,setUser]=useState({
      email:"",
      password:""
    })
   const loginDataChange=(e)=>{
    let name=e.target.name;
    let value=e.target.value;
    setUser({
      ...user,
      [name]:value
    })
    
   }
   const handleLogin=async(e)=>{
   e.preventDefault();
   const myForm=new FormData();
   myForm.set('email',user.email)
   myForm.set('password',user.password)
   try {
    console.log(user);
    const response=await axios.post('http://localhost:3000/api/auth/login',myForm,{withCredentials: true });
    const data=response.data;
    console.log(response);
    navigate("/feed")
    toast.success(data.message);
    
   } catch (error) {
    console.log(error);
     toast.error(error.response);
   }
   }
  
  return ( 
    <div className='flex justify-center items-center w-[90%] md:w-[25%] h-[70vh] mt-10 rounded-2xl no-scrollbar'>
    <div className="card bg-[#101828] shadow-sm  w-full h-full ">
      <h2 className='text-2xl font-bold text-center my-4 underline '>Login</h2>
      <form className='flex flex-col px-4 justify-center items-center gap-4' onSubmit={handleLogin}>
       <div className='w-[90%]' >
        <fieldset className="fieldset">
        <legend className="fieldset-legend text-lg">Email</legend>
        <input type="text" name="email" value={user.email} className="input w-full" placeholder="Enter your email" onChange={loginDataChange}/>
        </fieldset>
       </div>
       <div className='w-[90%]' >
        <fieldset className="fieldset">
        <legend className="fieldset-legend text-lg">Password</legend> 
        <input type="text" className="input w-full" name='password' value={user.password} placeholder="Enter your password" onChange={loginDataChange} />
        </fieldset>
       </div>
       <div className="card-actions flex justify-center w-[90%] mt-6" >
      <button className="btn btn-primary w-full text-m " type='submit'>Submit</button>
    </div>
     <div> <p >Don't have Account?<span className='text-blue-400 cursor-pointer' onClick={()=>setCurrentView('registerCard')}> Please Register!</span></p></div>
      </form>
  </div>
</div>
  )
}

export default Login
