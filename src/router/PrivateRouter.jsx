import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from "react-router-dom";
const PrivateRouter = () => {
  const auth = useSelector(state => state.auth);
 
   return auth.currentUser ? <Outlet/> : <Navigate to="/login" replace/> 

}

export default PrivateRouter