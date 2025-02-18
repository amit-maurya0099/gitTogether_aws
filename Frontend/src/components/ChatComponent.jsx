import React from 'react'

const ChatComponent = ({data}) => {
   
  return (
    <div className='h-full w-full'>
        <div className='relative top-0 h-12 bg-gray-600 text-white pl-2  shadow-2xl'>
            <div className='flex gap-4 font-semibold'> 
                <img src={data?.avatar?.url} className=' size-12 object-cover rounded-full'></img>
              <h2>{data?.firstName + " "+ data?.lastName}</h2>
            </div>
             
        </div>
        
        <div className='absolute w-[70%]  bottom-10 h-16 px-6 ml-6 '>
            <input className='w-full h-full px-6 text-lg' placeholder='Write your message here '></input>
        </div>
     
    </div>
  )
}

export default ChatComponent
