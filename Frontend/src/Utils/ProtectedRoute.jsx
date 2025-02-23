import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";
import Loader from "../components/Loader"

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((store) => store.user);
 
  if (!isAuthenticated) {
    return <Error />;
  }

  return children;
};

export default ProtectedRoute;