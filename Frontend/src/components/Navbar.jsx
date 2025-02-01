import React from 'react'
import Logo from "../assets/Logo.png"
import {toast} from "react-toastify"
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../Utils/userSlice'
const Navbar = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const user=useSelector((state)=>state.user)

  const profileImg=user?.avatar.url || "https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png";
  const handleLogout=async()=>{
    try {
      console.log("hello")
      const response=await axios.post('http://localhost:3000/api/auth/logout',{},{withCredentials:true});
      const data=response.data;
      toast.success(data.message)
      navigate('/');
      dispatch(removeUser())
         
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="navbar bg-[#191E24] shadow-sm sticky top-0 opacity-100 z-10">
  <div className="flex-1 ">
    <img src={Logo} className=" h-10 "></img>
  </div>
  <div className="flex gap-6 mr-6" >
    {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full ">
          <img
            alt="/"
            src={profileImg }/>
        </div>
      </div>
     {user && <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-200  rounded-box z-1 mt-3 w-52 p-2 shadow flex flex-col gap-2">
        <li className='text-sm cursor-pointer'>My Profile   </li>
        <li className='text-sm cursor-pointer'>Settings</li>
       <li className='text-sm cursor-pointer' onClick={handleLogout}>Logout</li>  
      </ul>}
    </div>
  </div>
</div>
  
  )
}

export default Navbar
