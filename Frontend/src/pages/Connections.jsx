import React, { useEffect } from 'react'
import axios from 'axios';
import  {useDispatch, useSelector} from "react-redux"
import  {addConnections} from "../Utils/connectionSlice"
import ConnectionCard from '../components/ConnectionCard';
import { motion } from 'framer-motion';
import {toast} from "react-toastify";
import {setIsLoading} from "../Utils/userSlice"
import Loader from "../components/Loader"

const Connections = () => {
   const dispatch=useDispatch();
   const {connections}=useSelector((store)=>store.connections)
   const {isLoading}=useSelector((store)=>store.user)

const fetchConnections=async()=>{

  try {
      dispatch(setIsLoading(true));
    const response=await axios.get(import.meta.env.VITE_BASE_URL+"/user/connections",{withCredentials:true});
       const data=response.data;
       dispatch(addConnections(data.data));
       dispatch(setIsLoading(false));
       
  } catch (error) {
   toast.error(error.response.message);
     dispatch(setIsLoading(false));
      console.log(error);
  } 
}
 useEffect(()=>{
    fetchConnections();
 },[])   

  


  return (
     <div className='h-[90vh] px-[2%] md:px-[10%] md:py-[2%] py-[5%] bg-[#191E24]'>
      {isLoading? <Loader/>:
      <motion.div 
      initial={{opacity:0,scale:0.5}} 
      animate={{opacity:1,scale:1}}
      transition={{
         duration:0.5
      }}
      className=' h-full w-full py-4 '>
       {connections?.length !=0 ?<>

         <div className='py-2 w-full mb-4  '>
            <h2 className='font-semibold text-2xl md:text-3xl text-center underline text-white'>My Connections</h2>
         </div>
         <div className='h-[80%] overflow-y-auto no-scrollbar '>
             
            {connections?.map((connection)=> <ConnectionCard connection={connection} key={connection._id}/>)}
            
         </div>
         </>:<div className='h-full flex justify-center items-center'>No connection found</div> }
 
     </motion.div>}
     </div>
    
   
   
  )
}

export default Connections
