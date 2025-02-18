import React, { useEffect } from 'react'
import {Routes,Route, useLocation, Outlet} from "react-router-dom"
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
import Connections from './pages/Connections';
import Requests from './pages/Requests';
import { setIsLoading } from './Utils/userSlice';
import Chats from './pages/Chats';
import ChatComponent from './components/ChatComponent';

const App = () => {
  const dispatch=useDispatch();
  const {isAuthenticated}=useSelector((store)=>store.user);

  
  const fetchUser=async()=>{
 try {
    setIsLoading(true);
   if(isAuthenticated ) return ;
   const response=await axios.get(BASE_URL+'/profile/view',{withCredentials:true})
     const data=response.data;
     dispatch(addUser(data.user));
     setIsLoading(false);
      
 } catch (error) {
  setIsLoading(false);
   if(error.status===401){
       console.log("Unauthorised Access")
   }else{
   console.log(error)}
 }
   }
   
   useEffect(()=>{
     fetchUser();
   },[isAuthenticated])


  
   
  return (
    <>
    <Navbar/>
     <Routes>
      <Route path="/*" element={<Error/>}></Route>
      <Route path='/' element={<Body/>}></Route>
      <Route path="/feed" element={<ProtectedRoute children={<Feed/>}/>}></Route>
      <Route path="/profile" element={<ProtectedRoute children={<Profile/>}/>}></Route>
      <Route path="/connections" element={<ProtectedRoute children={<Connections/>}/>}></Route>
      <Route path="/requests" element={<ProtectedRoute children={<Requests/>}/>}></Route>
      <Route path="/chats" element={<ProtectedRoute children={<Chats/>}/>}>
          <Route path=':id' element={<ChatComponent/>}></Route>
      
      </Route>
     
     </Routes>
     
     </>
  )
}

export default App;
