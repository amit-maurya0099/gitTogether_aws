import React from 'react'
import { useSelector } from 'react-redux'



const ProtectedRoute = ({Children}) => {
     const {isAuthenticated }=useSelector((store)=>store.user)
     if(!isAuthenticated ){
        return <div className='flex text-xl font-bold h-[90vh] justify-center items-center '><p>Not Authorised to access this Resource</p></div>
     }
     return <Children/>

}

export default ProtectedRoute;