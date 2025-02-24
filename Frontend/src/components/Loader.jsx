import React from 'react'
import LoadingImg from "../assets/loadingImg.gif"
import Lottie from 'lottie-react'
import loadingAnimation from "../Animations/loaderAnimation.json"

const Loader = () => {
  return (
    <div className='h-full w-full flex items-center justify-center '>
       {/* <img src={LoadingImg} alt="/loader" className='object-cover h-[40%]'></img> */}
       <Lottie animationData={loadingAnimation} loop={true} 
       style={{width:200 ,height:200}}></Lottie>

    </div>
  )
}

export default Loader
