import { useEffect, useState } from 'react';
import './App.css';
// import  {userObserver}  from './helpers/firebase';
import AppRouter from './router/AppRouter';
 import useFirebase from './helpers/firebase';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './redux/auth';

function App() {
  const dispatch = useDispatch()
const {observerUser} = useFirebase()
  useEffect(() => {
    observerUser(dispatch(setCurrentUser))
   }, [])
  
  return (
    <div className="App">
        <AppRouter />
    </div>
  );
}

export default App;
