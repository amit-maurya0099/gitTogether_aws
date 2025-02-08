import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";
import Loader from "../components/Loader"

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((store) => store.user);
  const [loading, setLoading] = useState(true); // Track loading state
  const IsLoader=useRef(false);
  

  useEffect(() => {
   
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 200); 

    return () => clearTimeout(timeout); 
  }, []);

  if (loading) {
       if(IsLoader.current ===true) return;
       IsLoader.current = true
     
       return<div className="min-h-screen max-w-screen flex items-center justify-center"> <Loader/> </div>
  }

  if (!isAuthenticated) {
    return <Error />;
  }

  return children;
};

export default ProtectedRoute;