import React from 'react'
import { MdClose } from "react-icons/md";
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const DetailCard = ({userDetail,setShowConnectionCard}) => {
      
  return (
    <div className='h-[450px] w-[300px] bg-gray-700 absolute z-10 top-[20%] md:top-[15%] left-[15%] md:left-[40%]'>
        <MdClose className='absolute text-3xl cursor-pointer right-4 top-2 text-gray-400' onClick={()=>{setShowConnectionCard(false)}}/>
        <div className='flex flex-col items-center justify-center w-full h-full'>
         <div>
        <img src={userDetail.avatar.url} alt="/" className='rounded-full h-[150px] w-[150px]'></img>
        </div>
        <div className='flex flex-col gap-3 items-center mt-6 w-full'>
          <h2> {userDetail.firstName+ " "+ userDetail.lastName}</h2> 
          <p >{userDetail.about} </p>
          <p>{userDetail.skills}</p>
          <div className='flex gap-4'>
           <Link to={userDetail.githubUrl}><FaGithubSquare className='text-3xl'/></Link>   
            <Link to={userDetail.linkedInUrl}>  <FaLinkedin className='text-3xl'/></Link>

          </div>
        </div>
        </div>
      
    </div>
  )
}

export default DetailCard
