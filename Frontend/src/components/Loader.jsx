import React from 'react'

import Lottie from 'react-lottie'
import loadingAnimation from "../Animations/loaderAnimation.json"


const Loader = () => {
  const defaultOptions={
      loop: true,
      autoplay: true, 
      animationData: loadingAnimation,
  }
  return (
    <div className='h-full w-full flex items-center justify-center '>
       {/* <img src={LoadingImg} alt="/loader" className='object-cover h-[40%]'></img> */}
       <Lottie options={defaultOptions}
       style={{width:200 ,height:200}}></Lottie>

    </div>
  )
}

export default Loader
