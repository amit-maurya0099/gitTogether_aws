import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../Utils/constants';
import { toast } from 'react-toastify';
import { addUser, setIsLoading } from '../Utils/userSlice';
import Loader from '../components/Loader';
const EditProfile =({user,setEditProfile}) => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {isLoading}=useSelector((store)=>store.user)
    const [firstname, setFirstname] = useState(user.firstName);
    const [lastname, setLastName] = useState(user.lastName);
    const [skills, setSkills] = useState(user.skills);
    const [about, setAbout] = useState(user.about);
    const [avatar, setAvatar] = useState(user.avatar.url);
    const [linkedInUrl, setLinkedInUrl] = useState(user.linkedInUrl);
    const [githubUrl, setGithubUrl] = useState(user.githubUrl);   
    
    const handleSubmit=async(e)=>{
          e.preventDefault();
           const myForm=new FormData();
           myForm.append("firstName",firstname)
           myForm.append("lastName",lastname)
           myForm.append("about",about)
           myForm.append("skills",skills)
           myForm.append("githubUrl",githubUrl)
           myForm.append("linkedInUrl",linkedInUrl)
           myForm.append("avatar",avatar)
        try {
            dispatch(setIsLoading(true));
         const response=await axios.patch(BASE_URL+ "/profile/edit",myForm,{withCredentials:true,
            headers: { "Content-Type": "multipart/form-data" },
         });
         const data=response.data;
         dispatch(setIsLoading(false));
         toast.success(data.message);
         dispatch(addUser(data.user));
         setEditProfile(false);
         
        
            
        } catch (error) {
            dispatch(setIsLoading(false));
           toast.error("Could'nt Update your profile")   ;
           console.log(error);
            
        }
          
    }
    const handleAvatarChange=(e)=>{
        
        const file=e.target.files[0];
        const reader=new FileReader();
        if(file){
        reader.onload=()=>{
            if(reader.readyState === 2){
                setAvatar(reader.result);
                
            }
        }
        reader.readAsDataURL(file);
    }
    }

    
  return (
    <div className='h-[90vh] w-screen flex justify-center'>
        {isLoading ? <Loader/>:
        <div className=' w-[85%] md:w-[50%] h-[90%] flex justify-center gap-8 pt-4 rounded-4xl '>
           <div className=" w-full md:w-[40%] h-full bg-[#191E24] rounded-xl">
            <h2 className='text-gray-200 text-center mt-6 font-semibold '>Edit Profile</h2>
            <form className='h-[85%] no-scrollbar overflow-y-scroll  mt-4 flex flex-col gap-4' onSubmit={handleSubmit}>
               <div className='px-4 flex flex-col gap-1 '>
                <p className='text-base'> FirstName<span className='text-red-600'>*</span></p>
                <input className='py-1 px-2 text-base border-gray-700 rounded-xl outline-none w-full' value={firstname} name="firstname" onChange={(e)=>{setFirstname(e.target.value)}}></input>
                </div>
                <div className='px-4 flex flex-col gap-1'>
                <p className='text-base'> LastName</p>
                <input className='py-1 px-2 text-base border-gray-700 rounded-xl outline-none w-full' value={lastname} name="lastname" onChange={(e)=>{setLastName(e.target.value)}}></input>
               </div>
           
               <div className='px-4 flex flex-col gap-1'>
                <p className='text-base'> About</p>
                <input className='py-1 px-2 text-base border-gray-700 rounded-xl outline-none w-full' value={about} name="about" onChange={(e)=>{setAbout(e.target.value)}}></input>
               </div>
                <div className='px-4 flex flex-col gap-1'>
                <p className='text-base'> Skills</p>
                <input className='py-1 px-2 text-base border-gray-700 rounded-xl outline-none w-full' value={skills} name="skills" onChange={(e)=>{setSkills(e.target.value)}}></input>
                </div>
                <div className='px-4 flex flex-col gap-1'>
                <p className='text-base'> Github Url</p>
                <input className='py-1 px-2 text-base border-gray-700 rounded-xl outline-none w-full' value={githubUrl} onChange={(e)=>{setGithubUrl(e.target.value)}}></input>
                </div>
                <div className='px-4 flex flex-col gap-1'>
                <p className='text-base'> LinkedIn Url</p>
                <input className='py-1 px-2 text-base border-gray-700 rounded-xl outline-none w-full' value={linkedInUrl} name="linkedInUrl" onChange={(e)=>{setLinkedInUrl(e.target.value)}}></input>
                </div>
                <div className='px-4 flex flex-col gap-1'>
                <p className='text-base'> Avatar</p>
                <input type="file" className='py-1 px-2 text-base border-gray-700 rounded-xl outline-none w-full cursor-pointer'
                 name="avatar" onChange={handleAvatarChange} ></input>
                </div>
                <div className='flex justify-center mt-6'>
                    <button className='py-1 px-6 bg-blue-800 cursor-pointer' type="submit">Save Profile</button>
                </div>


            </form>

           </div>
           <div className='w-[40%] h-full bg-[#191E24] hidden md:block rounded-xl'>
            <img src={user.avatar.url} className='h-[300px] w-full object-cover rounded-t-xl ' alt="/" ></img>
            <div className='flex flex-col items-center gap-2 mt-6 ' >
                <h2 className='font-semibold'>{( firstname) + " " +( lastname)}</h2>
                <div className='flex gap-4 justify-center pb-2 ' >
                  <Link to={githubUrl} ><FaGithubSquare className='text-4xl cursor-pointer' /></Link>
                  <Link to={linkedInUrl}><FaLinkedin className='text-4xl cursor-pointer'/></Link>
               </div>
               <p>{ about}</p>

            </div>
            

           </div>
          
        </div>

        }
    </div>
  )
}

export default EditProfile
