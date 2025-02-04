import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



const ProtectedRoute = ({Children}) => {
     const {isAuthenticated }=useSelector((store)=>store.user)
     const navigate=useNavigate();
     useEffect(()=>{
        if(!isAuthenticated){
          navigate("/");
        }
     },[])
     
     if(!isAuthenticated ){
          
        return <div className='flex text-xl font-bold h-[90vh] justify-center items-center '><p>Not Authorised to access this Resource</p></div>
     }
     return <Children/>

}

export default ProtectedRoute;