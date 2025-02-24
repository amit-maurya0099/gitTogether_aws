import React, { useState } from 'react'
import axios from 'axios'
import {toast} from "react-toastify"
import {useDispatch} from "react-redux"
import { removeRequest } from '../Utils/requestSlice';



const RequestCard = ({request}) => {
  const dispatch=useDispatch();
  

  const handleButtonClick=async(e)=>{
    const status=e.target.name;
    try {
      const url=import.meta.env.VITE_BASE_URL+`/connection/request/review/${status}/${request._id}`
      const response=await axios.post(url,{},{withCredentials:true});
      toast.success(response.data.message);
      dispatch(removeRequest(request._id))
      
    } catch (error) {
       console.log(error);
       toast.error('Something went wrong')
    }
 
  }

  return (
    <div className='h-[150px] mx-[1%] md:mx-[10%] border border-dashed  my-4 px-1 md:px-4 text-white '>
             <div className='h-full w-full flex justify-between items-center'>
            
               <h2 className='font-bold'>{request.fromUserId.firstName+ " "+ request.fromUserId.lastName}</h2>
               
               <p>{"on " + request.createdAt.split('T')[0] + " at "+ request.createdAt.split('T')[1].split('.')[0]}</p>
            
               <div className='flex gap-4'>
               <button className="btn btn-dash btn-secondary" name="accepted" onClick={handleButtonClick} >Accept</button>
               <button className="btn btn-dash btn-info" name="rejected" onClick={handleButtonClick}>Reject</button>
               </div>
               </div>
          
              
             
    </div>
  )
}

export default RequestCard
