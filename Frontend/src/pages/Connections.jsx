import React, { useEffect } from 'react'
import axios from 'axios';
import {BASE_URL} from "../Utils/constants";
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
    const response=await axios.get(BASE_URL+"/api/user/connections",{withCredentials:true});
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

  if(!connections || connections.length ===0) return <div  className='absolute top-[40%] left-[30%] md:left-[45%] text-xl'>No Connections found</div>;


  return (
     <div className='h-[90vh] px-[2%] md:px-[10%] md:py-[2%] py-[5%] '>
      {isLoading? <Loader/>:
      <motion.div 
      initial={{opacity:0,scale:0.5}} 
      animate={{opacity:1,scale:1}}
      transition={{
         duration:0.5
      }}
      className=' h-full w-full bg-[#191E24] py-4 '>
         <div className='py-2 w-full mb-4  '>
            <h2 className='font-semibold text-3xl text-center underline '>My Connections</h2>
         </div>
         <div className='h-[80%] overflow-y-auto no-scrollbar '>
            {connections.map((connection)=> <ConnectionCard connection={connection} key={connection._id}/>)}
         </div>
         

     </motion.div>}
     </div>
    
   
   
  )
}

export default Connections
