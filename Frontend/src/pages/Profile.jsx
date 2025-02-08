import React, { useState } from 'react'
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import EditProfile from './EditProfile';
import {motion} from "framer-motion"
import Loader from '../components/Loader';

const Profile = () => {
   const {user,isLoading}=useSelector((store)=>store.user);
   const navigate=useNavigate();
    const [editProfile,setEditProfile]=useState(false);
  return (
    <>
    {!editProfile &&
    <div className='h-[90vh] w-screen flex justify-center p-[3%] md:p-4  '>
      {isLoading? <Loader/>:
      <motion.div 
        initial={{scale:0, opacity:0}}
        animate={{scale:1,opacity:1}}
        transition={{
         duration:0.5,
         
        }}

      className='bg-[#191E24] mt-[5%] md:mt-0 h-[90%] md:h-[95%] w-[95%] md:w-[25%] rounded-2xl'>
         <div className='h-[40%] border-b border-gray-400 rounded-b-2xl flex flex-col items-center gap-4'>
          <img src={user?.avatar.url} alt="profileImg" className='rounded-full size-36 md:h-28 md:w-28 mt-4' ></img>
          <h2 className='text-xl font-semibold'>{user?.firstName + " " + user?.lastName}</h2>
          <div className='flex gap-4 justify-center  ' >
           <Link to={user?.githubUrl} ><FaGithubSquare className='text-4xl cursor-pointer' /></Link>
           <Link to={user?.linkedInUrl}><FaLinkedin className='text-4xl cursor-pointer'/></Link>
         </div>
         </div>
         <div className='h-[60%] px-4 overflow-auto no-scrollbar'>
          <div className="flex flex-col gap-2 mt-4 border-b pb-2 ">
             <h2 className='text-xl font-semibold'>About</h2>
             <p className='text-base'>{user?.about}</p>
          </div>
          <div className='pt-2 flex flex-col gap-4 '>
             <div className='flex gap-4 items-center'>
              <h2 className=' text-lg '>Email :</h2>
              <p className='text-base' >{user?.email}</p>
             </div>
             <div className='flex gap-4 items-center'>
              <h2 className=' text-lg '>Skills :</h2>
              <p className='text-base w-[80%] overflow-x-scroll no-scrollbar' >{user?.skills}</p>
             </div>
             <div className='flex gap-4 items-center'>
              <h2 className=' text-lg '>Github :</h2>
              <p className='text-base' >{user?.githubUrl}</p>
             </div>
             <div className='flex gap-4 items-center  '>
              <h2 className='text-lg '>LinkedIn:</h2>
              <p className='text-base ' >{user?.linkedInUrl}</p>
             </div>
             <div className='flex justify-center my-6'>
              <button className='py-1 text-base bg-[#018CB0] px-6 cursor-pointer' onClick={()=>setEditProfile(true)}> Edit</button>
             </div>
          </div>
           
         </div>
      </motion.div>
}
    </div>}
    {editProfile &&
    <EditProfile user={user} setEditProfile={setEditProfile}/>}
    </>
  )
}

export default Profile
