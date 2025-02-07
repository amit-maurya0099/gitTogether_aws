import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated} = useSelector((store) => store.user);
  const navigate=useNavigate();
  if(!isAuthenticated){
    return  <Error/>
  }
 
  return children;
};

export default ProtectedRoute;