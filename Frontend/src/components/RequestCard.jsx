import React, { useState } from 'react'


const RequestCard = ({request}) => {
  return (
    <div className='h-[150px] mx-[2%] md:mx-[10%] border border-dashed  my-4 px-2 md:px-4 '>
             <div className='h-full w-full flex justify-between items-center'>
               <h2 className='font-bold'>{request.fromUserId.firstName+ " "+ request.fromUserId.lastName}</h2>
               <p>{"on " + request.createdAt.split('T')[0] + " at "+ request.createdAt.split('T')[1].split('.')[0]}</p>
            
               <div className='flex gap-4'>
               <button className="btn btn-dash btn-secondary">Accept</button>
               <button className="btn btn-dash btn-info">Reject</button>
               </div>
               </div>
          
              
             
    </div>
  )
}

export default RequestCard
