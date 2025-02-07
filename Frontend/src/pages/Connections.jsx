import React, { useEffect } from 'react'
import axios from 'axios';
import {BASE_URL} from "../Utils/constants";
import  {useDispatch, useSelector} from "react-redux"
import  {addConnections} from "../Utils/connectionSlice"

const Connections = () => {
   const dispatch=useDispatch();
   const {connections}=useSelector((store)=>store.connections)
   console.log(connections)
const fetchConnections=async()=>{
    
  try {
    const response=await axios.get(BASE_URL+"/api/user/connections",{withCredentials:true});
       const data=response.data;
       dispatch(addConnections(data.data));
       
  } catch (error) {
      console.log(error);
  } 
}
 useEffect(()=>{
    fetchConnections();
 },[])   

  return (
    <div>
       connections
    </div>
  )
}

export default Connections
