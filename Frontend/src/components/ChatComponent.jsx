import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { createSocketConnection } from '../Utils/socket';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import {toast} from "react-toastify"

const ChatComponent = () => {
  const [newMessage, setNewMessage] = useState("");
  const [connection,setConnection]=useState(null);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const { user } = useSelector((store) => store.user);
  const userId = user._id;
  const { id } = useParams();
  const targetUserId = id;
  const messageEndRef=useRef();

   const getConnection=async()=>{
    try {
      const response= await axios.get(import.meta.env.VITE_BASE_URL + `/user/connection/${id}`,{withCredentials:true});
       const data=response.data;
       setConnection(data);  
       
    } catch (error) {
      // console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
    

   }
   useEffect(()=>{
    if(id ){
     getConnection();
    }

   },[id]);


  useEffect(() => {
    if (!targetUserId) return;
    const newSocket = createSocketConnection();
    setSocket(newSocket);
    newSocket.emit("joinChat", { firstName: user.firstName, userId, targetUserId })

    const handleMessageReceived = ({ name, text, senderId,timestamp }) => {
      if (senderId !== userId) { 
        setMessages((prevMessages) => [...prevMessages, { name, senderId, text,timestamp }]);
      }
    };

    newSocket.on("messageReceived", handleMessageReceived);
    newSocket.on("prevMessages", (prevMessages) => {
      setMessages([...prevMessages]);
    });

    return () => {
      newSocket.disconnect();
    }
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!socket || !newMessage.trim()) return;

    const messageData = {
      name: `${user.firstName} ${user.lastName}`,
      senderId: userId,
      targetUserId,
      text: newMessage,
      timestamp:new Date()
    }
    
    socket.emit("sendMessage", messageData);
    setMessages((messages) => [...messages, messageData]);
    setNewMessage("");


  }
   const scrollToBottom=()=>{
      messageEndRef.current?.scrollIntoView({behavior:"smooth"});
   }
  useEffect(()=>{
     scrollToBottom();
  },[messages]);

  
  return (
    <div className='h-full w-full  '>
      <div className=' h-[10%] bg-gray-600 text-white pl-2  shadow-2xl'>
        <div className='flex items-center gap-4 font-semibold'>
          <img src={connection?.avatar?.url} className=' size-12 object-cover rounded-full'></img>
          <h2>{connection?.firstName + " " + connection?.lastName}</h2>
        </div>
        

      </div>
      
      <div className='h-[75%] overflow-y-scroll no-scrollbar py-4'>
        {messages?.map((msg, index) => {
          return (
            <div className={` my-2 w-fit py-1 px-2 rounded-lg  ${msg.senderId === userId ? 'ml-auto text-right bg-gray-700 ' : 'mr-auto text-left bg-gray-900'
              }`} key={index}>
              <h2 className={` font-semibold text-base text-cyan-400`}>{msg.name}</h2>
              <p className='text-white text-base'>{msg?.text}</p>
              
              <h3 className='text-white'>{`${new Date(msg?.timestamp).getHours()}` + ":" +`${new Date(msg?.timestamp).getMinutes()}` }</h3>

            </div>
          )
        })}
        <div ref={messageEndRef}></div>


      </div>

      <div className='h-[15%]   w-[100%] flex gap-2  px-[5%] md:pt-4 pt-6 border-t border-gray-500 '>
        <input className='w-[80%] md:w-full md:h-[60%] h-[70%] rounded-xl px-4 text-white '
          placeholder='Write your message here'
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
          onKeyDown={(e)=>e.key==='Enter' && sendMessage()}
        ></input>
        <button 
         
        className="h-[70%] md:h-[60%] md:w-[10%] w-[20%] btn btn-dash btn-secondary cursor-pointer " onClick={sendMessage} >Send</button>
      </div>

    </div>
  )
}

export default ChatComponent
