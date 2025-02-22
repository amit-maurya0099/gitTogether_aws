import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { createSocketConnection } from '../Utils/socket';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../Utils/constants';
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
      const response= await axios.get(BASE_URL + `/user/connection/${id}`,{withCredentials:true});
       const data=response.data;
       setConnection(data);  
       
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
    

   }
   useEffect(()=>{
    if(id){
     getConnection();
    }

   },[id]);


  useEffect(() => {
    if (!targetUserId) return;
    const newSocket = createSocketConnection();
    setSocket(newSocket);
    newSocket.emit("joinChat", { firstName: user.firstName, userId, targetUserId })

    const handleMessageReceived = ({ name, text, senderId }) => {
      if (senderId !== userId) { 
        setMessages((prevMessages) => [...prevMessages, { name, senderId, text }]);
      }
    };

    newSocket.on("messageReceived", handleMessageReceived)

    return () => {
      newSocket.disconnect();
    }
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!socket || !newMessage.trim()) return;

    const messageData = {
      name: user.firstName + " " + user.lastName,
      senderId: userId,
      targetUserId,
      text: newMessage
    }
    
    socket.emit("sendMessage", messageData);
    setMessages((messages) => [...messages, messageData]);
    setNewMessage("");


  }
   const scrollToBottom=()=>{
      messageEndRef.current?.scrollIntoView({behaviour:"smooth"});
   }
  useEffect(()=>{
     scrollToBottom();
  },[messages]);

  
  return (
    <div className='h-full w-full p-2 '>
      <div className=' h-[10%] bg-gray-600 text-white pl-2  shadow-2xl'>
        <div className='flex gap-4 font-semibold'>
          <img src={connection?.avatar?.url} className=' size-12 object-cover rounded-full'></img>
          <h2>{connection?.firstName + " " + connection?.lastName}</h2>
        </div>

      </div>
      <div className='h-[80%] overflow-y-scroll no-scrollbar py-4'>
        {messages?.map((msg, index) => {
          return (
            <div className={` my-2 w-fit p-2 rounded-lg text-white ${msg.senderId === userId ? 'ml-auto text-right bg-blue-500' : 'mr-auto text-left bg-pink-500'
              }`} key={index}>
              <h2 className={` font-semibold  `}>{msg.name}</h2>
              <p className='text-lg'>{msg.text}</p>

            </div>
          )
        })}
        <div ref={messageEndRef}></div>


      </div>

      <div className=' h-[10%] w-[90%] flex gap-2  px-[5%] mt-2 '>
        <input className='w-full h-[70%] rounded-xl px-4  text-lg'
          placeholder='Write your message here'
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
          onKeyDown={(e)=>e.key==='Enter' && sendMessage()}
        ></input>
        <button 
         
        className="h-[69%] w-[10%] btn btn-dash btn-secondary cursor-pointer " onClick={sendMessage} >Send</button>
      </div>

    </div>
  )
}

export default ChatComponent
