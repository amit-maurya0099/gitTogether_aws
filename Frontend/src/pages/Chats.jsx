import React, { useEffect } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { addConnections } from '../Utils/connectionSlice';
import { setIsLoading } from '../Utils/userSlice';
import { BASE_URL } from '../Utils/constants';
import { useNavigate, useParams } from 'react-router-dom';
import ChatComponent from '../components/ChatComponent';
import LandingChatComponent from '../components/LandingChatComponent';



const Chats = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { connections } = useSelector((store) => store.connections);
  const params = useParams();

  const fetchConnections = async () => {

    try {
      dispatch(setIsLoading(true));
      const response = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
      const data = response.data;
      dispatch(addConnections(data.data));
      dispatch(setIsLoading(false));

    } catch (error) {

      dispatch(setIsLoading(false));
      console.log(error);
    }
  }
  useEffect(() => {
    fetchConnections();
  }, [])



  const handleChatClick = (connection) => {
    navigate(connection._id);

  }

  return (
    <div className='h-[90vh] w-screen bg-[#101828] bg-gradient-to-b from-gray-600 flex '>
      <aside className='w-[25%] border-r border-black   py-1 bg-gray-600 px-2'>
        <div >

          <h2 className='text-xl text-center font-semibold border-b pt-4 border-black h-16 '> Chats</h2>
          <div className='h-full overflow-y-scroll no-scrollbar'>
            <div className=' flex flex-col gap-6 pt-4'>
              {
                connections && connections.map((connection) => {
                  return <div className={`pl-2 h-18 text-black flex items-center gap-4 rounded-lg cursor-pointer bg-white  hover:bg-amber-100  `} key={connection?._id} onClick={() => handleChatClick(connection)}>
                   
                    <img className='size-16 object-cover rounded-full ' src={connection?.avatar.url}></img>
                    <div>
                      <h1>{connection?.firstName + " " + connection?.lastName}</h1>
                      <p>message</p>
                    </div>
                  </div>
                })
              }
            </div>
          </div>

        </div>
      </aside>
      {
        (params.id) ?
          <div className='w-[75%] h-full '>
            <ChatComponent />
          </div> : <div className='w-[75%] h-full flex justify-center items-center'><LandingChatComponent /></div>}

    </div>
  )
}

export default Chats;
