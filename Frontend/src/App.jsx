import React, { useEffect } from 'react'
import {Routes,Route, useLocation} from "react-router-dom"
import Body from './components/Body';
import Navbar from './components/Navbar';
import Feed from './pages/Feed';
import axios from 'axios';
import { BASE_URL } from './Utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from './Utils/userSlice';
import ProtectedRoute from './Utils/ProtectedRoute';
import Error from './components/Error';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
const App = () => {
  const dispatch=useDispatch();
  const {isAuthenticated}=useSelector((store)=>store.user)
  
   const fetchUser=async()=>{
 try {
   if(isAuthenticated ) return ;
   const response=await axios.get(BASE_URL+'/api/profile/view',{withCredentials:'include'})
     const data=response.data;
     dispatch(addUser(data.user));
      
 } catch (error) {
   if(error.status===401){
       console.log("Unauthorised Access")
   }else{
   console.log(error)}
 }
   }
   
   useEffect(()=>{
     fetchUser();
   },[])


   
  return (
    <>
    <Navbar/>
     <Routes>
      <Route path="/*" element={<Error/>}></Route>
      <Route path='/' element={<Body/>}></Route>
      <Route path='/feed' element={<ProtectedRoute  Children={Feed}/>}> </Route>
      <Route path="/profile" element={<Profile/>}></Route>
     </Routes>
     
     </>
  )
}

export default App;
