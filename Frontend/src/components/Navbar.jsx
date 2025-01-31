import React from 'react'
import Logo from "../assets/Logo.png"
const Navbar = () => {
  const profileImg=null;

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
            src={profileImg ?{profileImg} : "https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png" }/>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-200  rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between  ">
            Profile
            
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
  
  )
}

export default Navbar
