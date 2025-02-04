import React, { useEffect } from 'react';
import { BASE_URL } from '../Utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../Utils/feedSlice';
import axios from 'axios';
import UserCard from "../components/UserCard"
import {setIsLoading} from "../Utils/userSlice"
import Loader from '../components/Loader';

const Feed = () => {
    const dispatch=useDispatch();
  const {feed}=useSelector((store)=>store.feed);
  const {isLoading}=useSelector((store)=>store.user);  
 
  
   const  getFeedData=async()=>{
    if(feed) return;

     try {
        dispatch(setIsLoading(true));
      const response=await axios.get(BASE_URL+'/api/user/feed',{withCredentials:true})
      const data=response.data;
      dispatch(addFeed(data.users))
      dispatch(setIsLoading(false));
     } catch (error) {
        console.log(error?.response?.data.message)
        dispatch(setIsLoading(false));
        
     }
   }
   useEffect(()=>{
     getFeedData();
   },[])

  return (
    <div className=" h-[90vh]   flex justify-center items-center ">
      {
        isLoading?<Loader/>:
    ( feed &&
      <UserCard user={feed[0]}/>
    )}
    </div>
  )
}

export default Feed;
