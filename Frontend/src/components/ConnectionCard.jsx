import React, { useState } from 'react'
import UserCard from './UserCard'
import DetailCard from './DetailCard';


const ConnectionCard = ({connection}) => {
    const [showConnectionCard,setShowConnectionCard]=useState(false);
   
  return (
    
    <div className='h-[100px] md:h-[150px] mx-[2%] md:mx-[10%] border border-dashed  my-4 px-2 md:px-4 text-white'>
             <div className='h-full w-full flex justify-between items-center'>
               <img src={connection.avatar.url} alt="/" className='rounded-full object-cover w-[60px] h-[60px] md:w-[100px] md:h-[100px]'></img>
               <div className='flex flex-col md:flex md:flex-row md:gap-6  ml-2'>
               <h2 className='font-semibold md:font-normal '>{connection.firstName + " "+ connection.lastName}</h2>
               <p className=' overflow-x-auto md:w-[150px] w-[100px] text-sm'>{connection.about}</p>
               </div>
               <div>
               <button className="btn btn-dash btn-info " onClick={()=>{setShowConnectionCard(true)}}>View Details</button>
               </div>
               </div>
             {showConnectionCard && <DetailCard userDetail={connection} setShowConnectionCard={setShowConnectionCard}/>}
              
             
    </div>
  
  )
}

export default ConnectionCard
