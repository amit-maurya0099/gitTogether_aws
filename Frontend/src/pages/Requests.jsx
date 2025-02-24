import React, { useEffect } from 'react'
import axios from 'axios';
import  {useDispatch, useSelector} from "react-redux"
import  {addRequests} from "../Utils/requestSlice"
import RequestCard from '../components/RequestCard';
import {motion} from "framer-motion"
import {toast} from "react-toastify";
import {setIsLoading} from "../Utils/userSlice"
import Loader from "../components/Loader"

const Requests = () => {
   const dispatch=useDispatch();
   const {requests}=useSelector((store)=>store.requests)
   const {isLoading}=useSelector((store)=>store.user)
  
   

const fetchRequests=async()=>{

  try {
      dispatch(setIsLoading(true));
    const response=await axios.get(import.meta.env.VITE_BASE_URL+"/user/requests",{withCredentials:true});
       const data=response.data;
       dispatch(addRequests(data));
       dispatch(setIsLoading(false));
       
  } catch (error) {
      console.log(error);
      dispatch(setIsLoading(false));
      
  } 
}
 useEffect(()=>{
    fetchRequests();
 },[])   


   if(!requests || requests.length ===0) return <div className='absolute top-[40%] left-[30%] md:left-[45%] text-xl text-white '>No Request found</div>;
  

  return (
     <div className='h-[80vh] md:h-[90vh] px-[3%] md:px-[10%] md:py-[2%] py-[5%] bg-[#191E24]'>
      {isLoading? <Loader/> :
       <motion.div
         initial={{opacity:0,scale:0.5}}
         animate={{opacity:1,scale:1}}
         transition={{
          duration:0.5
         }}
       
      className=' h-full w-full bg-[#191E24] py-4 '>
         <div className='py-2 w-full mb-4  '>
            <h2 className='font-semibold  text-2xl md:text-3xl text-center underline '> Connection Requests</h2>
         </div>
         <div className='h-[80%] overflow-y-auto no-scrollbar '>
        
           {requests.map((request)=><RequestCard request={request} key={request._id}/>)}
         </div>
       
         

     </motion.div>}
    
    </div>
   
   
  )
}

export default Requests;
