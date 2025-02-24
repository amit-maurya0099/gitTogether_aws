import React, { useState } from 'react'
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import EditProfile from './EditProfile';
import {motion} from "framer-motion"
import Loader from '../components/Loader';
import BGImg from "../assets/BG2.png"
const Profile = () => {
   const {user,isLoading}=useSelector((store)=>store.user);
   const navigate=useNavigate();
    const [editProfile,setEditProfile]=useState(false);
  return (
    <>
    {!editProfile &&
    <div className='h-[90vh]  flex justify-center pt-4 md:p-4 ' 
     style={{backgroundImage:`url(${BGImg})`,backgroundSize:"cover",width:"100%", height:"90vh",backgroundAttachment:'fixed'}}>
      {isLoading? <Loader/>:
      <motion.div 
        initial={{scale:0, opacity:0}}
        animate={{scale:1,opacity:1}}
        transition={{
         duration:0.5,
         
        }}

      className='bg-[#191E24]  md:mt-0 h-[80%] w-[95%] md:w-[25%] rounded-2xl text-white'>
         <div className='h-[40%] border-b border-gray-400 rounded-b-2xl flex flex-col items-center gap-2 md:gap-4'>
          <img src={user?.avatar.url} alt="profileImg" className='rounded-full size-20 md:size-24 mt-4' ></img>
          <h2 className='text-base md:text-lg font-semibold'>{user?.firstName + " " + user?.lastName}</h2>
          <div className='flex gap-4 justify-center  ' >
           <Link to={user?.githubUrl} ><FaGithubSquare className='text-3xl md:text-4xl cursor-pointer' /></Link>
           <Link to={user?.linkedInUrl}><FaLinkedin className='text-3xl md:text-4xl cursor-pointer'/></Link>
         </div>
         </div>
         <div className='h-[60%] px-4 '>
          <div className="flex flex-col mt-1 border-b pb-2 ">
             <h2 className='text-base md:text-lg font-semibold'>About</h2>
             <p className='text-base'>{user?.about}</p>
          </div>
          <div className='pt-2 flex flex-col gap-1 text-base '>
             <div className='flex gap-2 items-center '>
              <h2 className='  font-semibold md:text-lg'>Email :</h2>
              <p >{user?.email}</p>
             </div>
             <div className='flex gap-2 items-center'>
              <h2 className=' font-semibold md:text-lg '>Skills :</h2>
              <p  >{user?.skills}</p>
             </div>
             <div className='flex gap-2 items-center'>
              <h2 className=' font-semibold md:text-lg'>Github:</h2>
              <p className='w-full text-wrap' >{user?.githubUrl}</p>
             </div>
             <div className='flex gap-2 items-center  '>
              <h2 className='font-semibold md:text-lg '>LinkedIn:</h2>
              <h2 className=' w-full overflow-x-scroll no-scrollbar' >{user?.linkedInUrl}</h2>
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
