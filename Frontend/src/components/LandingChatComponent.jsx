import React, { useEffect, useState } from 'react'
import Lottie from "react-lottie";
import ChatLandingAnimation from "../Animations/chatLandingAnimation.json"
import { useSelector } from 'react-redux';

const LandingChatComponent = () => {

    const { user } = useSelector((store) => store.user);
    const [greetings, setGreetings] = useState();

    const getGreetingMessage = () => {
        const hour = new Date().getHours();

        if (hour >= 5 && hour < 12) {
            return { greeting: `Good Morning! ${user?.firstName}`, message: ' Start your day with a great conversation.' };
        } else if (hour >= 12 && hour < 17) {
            return { greeting: `Good Afternoon! ${user?.firstName}`, message: 'Stay connected and keep the chats going' };
        } else if (hour >= 17 && hour <19) {
            return { greeting: `Good Evening! ${user?.firstName}`, message: ' Relax and enjoy meaningful conversations' };
        } else {
            return { greeting: `Good Night! ${user?.firstName}`, messgae: "Have a chat before you call it a day" };
        }
    };
    const defaultOptions={
        loop: true,
        autoplay: true, 
        animationData:ChatLandingAnimation ,
    }

    useEffect(() => {
        setGreetings(getGreetingMessage());
    }, [])


    return (
        <div className='w-[50%] flex flex-col gap-2 '>
            <div className='flex flex-col justify-center items-center'>
                <h2 className='font-bold text-2xl text-amber-100'>{greetings?.greeting}</h2>
                <p className='italic text-lg text-white'>{greetings?.message}</p>
                <p className='italic text-lg text-white'>Wake up and Build it</p>
                

                 </div>
               
            <Lottie options={defaultOptions} width={400} height={400} />

        </div>
    )
}

export default LandingChatComponent
