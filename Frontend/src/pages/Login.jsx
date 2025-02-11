import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useDispatch, useSelector} from "react-redux";
import { addUser, setIsLoading } from '../Utils/userSlice';
import { BASE_URL } from '../Utils/constants';
import Loader from '../components/Loader';


const Login = ({setCurrentView}) => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {isLoading}=useSelector((store)=>store.user)
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
     dispatch(setIsLoading(true)); 
    const response=await axios.post(BASE_URL+'/auth/login',myForm,{withCredentials: true });
    const data=response.data;
    navigate("/feed")
    toast.success(data.message);
     dispatch(addUser(data.user))
     dispatch(setIsLoading(false)); 
      
   } catch (error) {
    dispatch(setIsLoading(false)); 
     toast.error(error.response.data.message);
     
   }
   }
  
  return ( 
    <div className='flex justify-center items-center mt-28 w-[90%] md:w-[25%] h-[50vh]  md:h-[60vh] md:mt-20 rounded-2xl no-scrollbar'>
      {isLoading?<Loader/>:
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
      <button className="btn btn-primary w-full text-m " type='submit'>{isLoading ? <Loader/>:"Submit"}</button>
    </div>
     <div> <p >Don't have Account?<span className='text-blue-400 cursor-pointer' onClick={()=>setCurrentView('registerCard')}> Please Register!</span></p></div>
      </form>
  </div>
}
</div>
  )
}

export default Login
