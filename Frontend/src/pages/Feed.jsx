import React, { useEffect } from 'react';
import { BASE_URL } from '../Utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../Utils/feedSlice';
import axios from 'axios';
import UserCard from "../components/UserCard"

const Feed = () => {
    const dispatch=useDispatch();
  const {feed}=useSelector((store)=>store.feed);  
  
   const  getFeedData=async()=>{
    if(feed) return;
     try {
      const response=await axios.get(BASE_URL+'/api/user/feed',{withCredentials:true})
      const data=response.data;
      dispatch(addFeed(data.users))
     } catch (error) {
        console.log(error?.response?.data.message)
        
     }
   }
   useEffect(()=>{
     getFeedData();
   },[])

  return (
    <div className=" h-[90vh]  flex justify-center items-center mt-auto">
    { feed &&
       <UserCard user={feed[0]}/>
       }
    </div>
  )
}

export default Feed;
