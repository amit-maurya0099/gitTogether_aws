import React, { useState } from 'react'
import Logo from "../assets/Logo.png"
import {toast} from "react-toastify"
import axios from 'axios'
import {Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../Utils/userSlice'
import { BASE_URL } from '../Utils/constants'
import { IoMenu } from "react-icons/io5";
const Navbar = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [togglemenu,setToggleMenu]=useState(false)
  const [profilemenu,setProfileMenu]=useState(false)
  const {user,isAuthenticated}=useSelector((state)=>state.user)
  
  const profileImg= user? user.avatar.url :"https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png";
  const handleLogout=async()=>{
    try {
     
      const response=await axios.post(BASE_URL+'/api/auth/logout',{},{withCredentials:true});
      const data=response.data;
      toast.success(data.message)
      navigate('/');
      dispatch(removeUser())
      setProfileMenu(!profilemenu)
      
    } catch (error) {

      toast.error(error.response?.data.message);
    }
  }
  const handleToggleMenu=()=>{
      setToggleMenu(!togglemenu);
  }
  return (
    <div className="navbar bg-[#191E24] shadow-sm sticky top-0 opacity-100 z-10 flex justify-between">
      
      
  <div className='flex gap-1 items-center '>
    {isAuthenticated && <div className='md:hidden'><IoMenu className='text-4xl' onClick={handleToggleMenu}/></div>}
    <img src={Logo} className=" h-8 md:h-10 "></img>
  </div>
  {isAuthenticated &&
  <div className={`${togglemenu? "absolute z-10 left-5 top-14 p-3 flex flex-col gap-3 w-40":"hidden md:flex"}    md:gap-4 mr-10 bg-[#191E24]  rounded-xl text-base font-sans font-medium `}  >
   <Link to="/" onClick={()=>setToggleMenu(false)}> <h2>Home</h2></Link>
    <Link to="/feed" onClick={()=>{setToggleMenu(false)}}><h2>Feed</h2></Link>
    <h2>Messages</h2>
    <h2>About us</h2>
  </div>}
  <div className="flex gap-6 mr-2 items-center" >
    {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
  { user && <p className='text-lg font-serif text-white'>Welcome, {user.firstName}</p>}
    <div className="dropdown dropdown-end cursor-pointer " onClick={()=>{ if(isAuthenticated) setProfileMenu(!profilemenu)}} >
    
      <div tabIndex={10} role="button" className="btn btn-ghost btn-circle avatar">
       
        <div className="w-10 rounded-full ">
           
          <img
            alt="/"
            src={profileImg }/>
        </div>
      </div>
     {user && profilemenu && <ul
        tabIndex={0}
        className="menu menu-sm  bg-base-200  rounded-box z-1 mt-3 w-52 p-2 shadow flex gap-2 absolute right-5 top-10">
       <Link to="/profile" onClick={()=>setProfileMenu(!profilemenu)} > <li className='text-base cursor-pointer'>My Profile   </li></Link>
       <Link to="/connections" onClick={()=>setProfileMenu(!profilemenu)}> <li className='text-base cursor-pointer'>Connections</li></Link>
        <Link to="/requests" onClick={()=>setProfileMenu(!profilemenu)}><li className='text-base cursor-pointer'>Requests</li></Link>
       <li className='text-base cursor-pointer' onClick={handleLogout}>Logout</li>  
      </ul>}
    </div>
  </div>
</div>
  
  )
}

export default Navbar
