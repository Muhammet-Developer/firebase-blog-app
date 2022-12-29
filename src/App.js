import { useEffect, useState } from 'react';
import './App.css';
// import  {userObserver}  from './helpers/firebase';
import AppRouter from './router/AppRouter';
 import useFirebase from './helpers/firebase';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './features/auth';

function App() {
  const dispatch = useDispatch()
const {observerUser} = useFirebase()
  useEffect(() => {
    observerUser(dispatch(setCurrentUser))
   }, [])
  
  return (
    <>
      <div className="App">
        <AppRouter />
        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>
      </div>
    </>
  );
}

export default App;
