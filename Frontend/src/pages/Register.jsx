import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { addUser,setIsLoading } from '../Utils/userSlice'

const Register = ({setCurrentView}) => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    
      const [user,setUser]=useState({
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            skills:[],
            about:"",
            linkedInUrl:"",
            githubUrl:"",
            avatar:""
            
      })
     
      const registerDataChange=(e)=>{
      
          let name=e.target.name;
          let value=e.target.value;
          if(name==="avatar"){
            const reader=new FileReader();
            let file=e.target.files[0];

          
            if(file){
             reader.onload=()=>{
                  if(reader.readyState ===2){
                        setUser({...user,avatar:reader.result})
                  }
             }
            }
             reader.readAsDataURL(file);

          }
          else if(name==="skills"){
              setUser({...user,skills:value.split(",")})
          }
          else{
            setUser({
                  ...user,
                  [name]:value
            })
          }

      }

    const handleRegister=async(e)=>{
      e.preventDefault();
      const myForm=new FormData();
      myForm.set("firstName",user.firstName);
      myForm.set("lastName",user.lastName);
      myForm.set("email",user.email);
      myForm.set("password",user.password);
      myForm.set("skills",user.skills);
      myForm.set("about",user.about);
      myForm.set("githubUrl",user.githubUrl)
      myForm.set("linkedInUrl",user.linkedInUrl);
      myForm.set("avatar",user.avatar);
    
      try {    
            dispatch(setIsLoading(true));
        const response=await axios.post(import.meta.env.VITE_BASE_URL+"/auth/signup",myForm,{withCredentials: true });
         const data=response.data;
         dispatch(setIsLoading(false)); 
         navigate('/feed');
         dispatch(addUser(data.user));
        toast.success(response.data.message);


      } catch (error) {
            dispatch(setIsLoading(false)); 
            toast.error(error.response.data.message)
      }
     
       
    }


  return (
      <div className='w-[90%] md:w-[35%] h-[70vh] mt-10 bg-[#101828] rounded-xl shadow-2xl no-scrollbar text-white'>
    

         <h2 className='text-2xl font-bold text-center my-4 underline'>Register</h2>
         <form className=' flex flex-col gap-4 items-center justify-center' onSubmit={handleRegister}>
          <div className='flex flex-col gap-4 items-center  md:flex md:flex-row md:justify-evenly md:items-center w-full text-base' >
            
                <input name="firstName" value={user.firstName} className=' w-[80%] md:w-[40%] border-t-0 border-r-0 rounded-l-xl border-b-gray-500 pl-2 py-0.5  outline-none' placeholder='firstname*' onChange={registerDataChange} ></input>
                
                <input name="lastName" value={user.lastName} className='w-[80%] md:w-[40%] border-r-0 rounded-l-xl border-t-0 border-b-gray-500 pl-2 py-0.5  border-gray-600 outline-none' placeholder='lastname' onChange={registerDataChange}></input>
       
          </div>
          <div className='flex flex-col gap-4 items-center  md:flex md:flex-row md:justify-evenly w-full text-base' >
            
                <input name="email" value={user.email} className='w-[80%] md:w-[40%] border-t-0 border-r-0 rounded-l-xl border-b-gray-500 pl-2 py-0.5  outline-none' placeholder='Email*' onChange={registerDataChange}></input>
                
                <input name="password" value={user.password} className='w-[80%] md:w-[40%] border-r-0 rounded-l-xl border-t-0 border-b-gray-500 pl-2 py-0.5  border-gray-600 outline-none' placeholder='Password*' onChange={registerDataChange}></input>
          </div>
          <div className='flex flex-col gap-4 items-center  md:flex md:flex-row md:justify-evenly w-full text-base' >
            
                <input name="skills" value={user.skills} className='w-[80%] md:w-[40%] border-t-0 border-r-0 rounded-l-xl border-b-gray-500 pl-2 py-0.5  outline-none' placeholder='Skills' onChange={registerDataChange}></input>
                
                <input name="about" value={user.about} className='w-[80%] md:w-[40%] border-r-0 rounded-l-xl border-t-0 border-b-gray-500 pl-2 py-0.5  border-gray-600 outline-none' placeholder='About' onChange={registerDataChange}></input>
       
          </div>
          <div className='flex flex-col gap-4 items-center  md:flex md:flex-row md:justify-evenly w-full text-base' >
            
                <input name="githubUrl" value={user.githubUrl} className='w-[80%] md:w-[40%] border-t-0 border-r-0 rounded-l-xl border-b-gray-500 pl-2 py-0.5  outline-none' placeholder='Github url' onChange={registerDataChange}></input>
                
                <input name="linkedInUrl" value={user.linkedInUrl} className='w-[80%] md:w-[40%] border-r-0 rounded-l-xl border-t-0 border-b-gray-500 pl-2 py-0.5  border-gray-600 outline-none' placeholder='LinkedIn Url' onChange={registerDataChange}></input>
       
          </div>

           <div className=' flex justify-center gap-2 w-full my-2 ' >
            <label className='text-white px-3 text-base bg-blue-500 rounded-xl'>Profile*</label>
            <input type='file' name="avatar" accept='image/*' className='w-[40%] cursor-pointer border-t-0 border-r-0 rounded-l-xl border-b-gray-500 pl-2  outline-none' onChange={registerDataChange}>
            </input>
        
         </div>
         
          <div className='w-full px-[10%]' >
            <button type='submit' className='w-full py-1 text-lg bg-blue-700 text-white rounded-xl cursor-pointer'>Register</button>
          </div>
          
    
        <div> <p >Already have Account?<span className='text-blue-400 cursor-pointer' onClick={()=>setCurrentView('loginCard')}> Please Login!</span></p></div>
         </form>
         
      
   
     </div>
  )
}

export default Register
