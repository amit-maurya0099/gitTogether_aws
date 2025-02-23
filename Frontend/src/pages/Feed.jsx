import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../Utils/feedSlice';
import axios from 'axios';
import UserCard from "../components/UserCard"
import {setIsLoading} from "../Utils/userSlice"
import Loader from '../components/Loader';
import BGImg from "../assets/BG2.png"

const Feed = () => {
    const dispatch=useDispatch();
  const {feed}=useSelector((store)=>store.feed);
  const {isLoading} =useSelector((store)=>store.user)

  const getFeedData=async()=>{
    try {
        dispatch(setIsLoading(true));
      const response=await axios.get(import.meta.env.VITE_BASE_URL+"/user/feed",{withCredentials:true});
      const data=response.data;
      dispatch(addFeed(data.users));
      dispatch(setIsLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setIsLoading(false))
    }
  }
  useEffect(()=>{
    getFeedData();
  },[])

   

  return (
    <div className="h-[90vh] flex justify-center items-center "
    style={{backgroundImage:`url(${BGImg})`,backgroundSize:"cover",backgroundAttachment:'fixed'}}>
      {
      isLoading?<Loader/>:
      <UserCard user={feed[0]}/>}
  
    </div>
  )
}

export default Feed;
