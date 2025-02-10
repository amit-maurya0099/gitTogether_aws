import React, { useState } from 'react'
import BGImg from "../assets/BG2.png"
import HomeCard from '../components/HomeCard'
import Login from './Login'
import Register from './Register'
import {motion} from "framer-motion"
import Footer from '../components/Footer'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'
const LandingPage = () => {
  const [currentView,setCurrentView]=useState('homeCard');
  const {isLoading} =useSelector((store)=>store.user);
  const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
  };

  return (
    <div style={{backgroundImage:`url(${BGImg})`,backgroundSize:"cover",width:"100%", height:"100vh",backgroundAttachment:'fixed'}}>
      <div className='overflow-y-auto flex justify-center w-full h-full no-scrollbar '>
     
       {currentView === 'homeCard' && (
         <motion.div
         key="homeCard"
         initial='hidden'
         exit='exit'
         animate='visible'
         variants={fadeInUp}
         className='flex w-full justify-center'
          >
       <HomeCard  setCurrentView={setCurrentView} /></motion.div>)}
       {currentView ==="loginCard" && (
           <motion.div
            key="loginCard"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeInUp}
            className='w-full flex justify-center'
          ><Login setCurrentView={setCurrentView}/></motion.div>)}
      {currentView === "registerCard" && (  
        <motion.div
            key="registerCard"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeInUp}
            className='w-full flex justify-center'
          >{isLoading? <Loader/> :<Register setCurrentView={setCurrentView}/>}</motion.div>)}
      </div>
      <Footer/>
     
    </div>
  )
}

export default LandingPage
