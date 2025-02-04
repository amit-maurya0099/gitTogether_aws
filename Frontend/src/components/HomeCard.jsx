import Lottie from 'lottie-react'
import React from 'react'
import homeAnimation from "../Animations/homeAnimation.json"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'
const HomeCard = ({setCurrentView}) => {
  const {isAuthenticated}=useSelector((store)=>store.user);
  const navigate=useNavigate();
  return (
    <div className='absolute mt-6 md:mt-4 p-6 bg-gray-900 rounded-3xl w-[90%] md:w-[40%]'>
    <div className=" flex items-center justify-center ">
 
  <div className="text-center space-y-6 md:space-y-2">
    <h1 className="text-4xl font-bold">
      Welcome, Developers! 🚀
    </h1>

    <p className="text-xl  text-gray-300 italic ">
    Connect, Collaborate & Build Together.
    </p>
    <p className='text-md italic text-gray-200'>A platform built specifically for coders, open-source contributors, and tech enthusiasts.</p>

   
    <div className="w-80 mx-auto">
      <Lottie animationData={homeAnimation} loop={true} width={200} height={200} />
    </div>

   
    <div className="flex gap-4 justify-center">
     <button className="px-6 py-3 bg-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-700 transition cursor-pointer" onClick={()=>{isAuthenticated? navigate("/feed"):setCurrentView('loginCard')}}>
        Get Started 
        </button>
        
      
     
    </div>
  </div>
</div>
    </div>
  )
}

export default HomeCard
