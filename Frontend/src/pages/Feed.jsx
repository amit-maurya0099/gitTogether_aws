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

  const getFeedData=async()=>{
    try {
      const response=await axios.get(BASE_URL+"/api/user/feed",{withCredentials:true});
      const data=response.data;
      dispatch(addFeed(data.users));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getFeedData();
  },[])

   if(!feed || feed.length===0) return <div className='absolute top-[40%] left-[30%] md:left-[45%] text-xl '>No User found</div>;

  return (
    <div className="h-[80vh] flex justify-center items-center md:mt-6 mt-8">
     
      <UserCard user={feed[0]}/>
  
    </div>
  )
}

export default Feed;
