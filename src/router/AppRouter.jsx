import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Dashboard from "../pages/Dashboard"
import Login from "../pages/Login";
import Register from "../pages/Register";
import Details from "../pages/Details";
import NewBlog from "../pages/NewBlog";
import Profile from "../pages/Profile";
import Navbar from '../components/Navbar';
import PrivateRouter from './PrivateRouter';
import UpdateBlog from '../pages/UpdateBlog';
import { SkeletonTheme } from 'react-loading-skeleton';
const AppRouter = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <SkeletonTheme baseColor="#202020" highlightColor="#444">

    <Routes >
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>

      <Route path='/details/:id' element={<PrivateRouter/>}>
      <Route index element={<Details/>}/>
      </Route>

      <Route path='/update' element={<PrivateRouter/>}>
      <Route path='' element={<UpdateBlog/>}/>
      </Route>

      <Route path='/newBlog' element={<PrivateRouter/>} >
      <Route path='' element={<NewBlog/>} />
      </Route>
      
      <Route path='/profile' element={<PrivateRouter/>} >
      <Route path='' element={<Profile/>} />
      </Route>
    </Routes>
    </SkeletonTheme>
    </BrowserRouter>
  )
}

export default AppRouter