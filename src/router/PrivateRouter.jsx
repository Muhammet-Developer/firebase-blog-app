import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from "react-router-dom";
import { toastInformation } from '../helpers/toastNotify';
const PrivateRouter = () => {
  const auth = useSelector(state => state.auth);
 
   return auth.currentUser ? <Outlet/> :  <Navigate to="/login"  replace /> 

}

export default PrivateRouter