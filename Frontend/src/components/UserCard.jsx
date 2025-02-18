import React from 'react'
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import  {Link} from "react-router-dom"
import {motion} from "framer-motion"
import axios from 'axios';
import {toast} from "react-toastify";
import { BASE_URL } from "../Utils/constants";
import { useDispatch } from 'react-redux';
import { removeFeedUser } from '../Utils/feedSlice';
const UserCard = ({user}) => {
     const dispatch=useDispatch();
  const handleClick=async(e)=>{
   const status=e.target.name;
   try {
    const response=await axios.post(BASE_URL+`/connection/request/send/${status}/${user._id}`,{},{withCredentials:true})
    toast.success(response.data.message);
     dispatch(removeFeedUser(user._id))
     
   } catch (error) {
      toast.error(error.response.message)
     
   }
  }

  return (
    <motion.div
    initial={{scale:0.5, opacity:0}}
    animate={{scale:1,opacity:1 }}
    transition={{
     duration:0.5,
     
    }}
    className="card bg-base-300 w-[85%]   md:w-[20%] h-[70%] md:h-[80%] shadow-sm  ">
  <div className='h-[50%]'>
    <img
      src={user?.avatar.url}
      alt="avatar"
      className='object-cover w-full h-full rounded-t-xl '
       />
  </div>
  <div className="card-body text-lg flex flex-col gap-3 items-center">
    <h2 className="card-title font-bold ">{user?.firstName + " "+ user?.lastName}</h2>
     <h2 className='text-base font-semibold'>{user?.about}</h2>
    <div className='flex gap-4 justify-center ' >
      <Link to={user?.githubUrl} ><FaGithubSquare className='text-3xl cursor-pointer' /></Link>
      <Link to={user?.linkedInUrl}><FaLinkedin className='text-3xl cursor-pointer'/></Link>     
    </div>
    <div className="card-actions justify-center my-4  w-full">
      <button className="btn btn-primary" name="ignored" onClick={handleClick}>Ignore</button>
      <button className="btn btn-secondary" name="interested" onClick={handleClick}>Interested</button>
    </div>
  </div>
</motion.div>
  )
}

export default UserCard
