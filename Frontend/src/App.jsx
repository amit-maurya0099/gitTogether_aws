import React, { useEffect } from 'react'
import {Routes,Route, useParams, useLocation} from "react-router-dom"
import Body from './components/Body';
import Navbar from './components/Navbar';
import Feed from './pages/Feed';
import axios from 'axios';
import { BASE_URL } from './Utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from './Utils/userSlice';
import ProtectedRoute from './Utils/ProtectedRoute';
const App = () => {
 const location=useLocation();
 const path=location.pathname;
  
 const dispatch=useDispatch();
 const {isAuthenticated,setIsAuthenticated}=useSelector((store)=>store.user)
 
  const fetchUser=async()=>{
try {
  if(isAuthenticated || path==="/") return ;
  const response=await axios.get(BASE_URL+'/api/profile/view',{withCredentials:'include'})
    const data=response.data;
    dispatch(addUser(data.user));
     setIsAuthenticated(true);
} catch (error) {
  if(error.status===401){
    
  }
}
  }
  
  useEffect(()=>{
    fetchUser();
  },[])


   
  return (
    <>
    <Navbar/>
     <Routes>
      <Route path='/' element={<Body/>}></Route>
      <Route path='/feed' element={<ProtectedRoute  Children={Feed}/>}>
          
      </Route>
     </Routes>
     
     </>
  )
}

export default App;
