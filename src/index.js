import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'tw-elements';
import {Provider} from "react-redux"
import { persistor, store } from './redux/Store';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}> 
    <ToastContainer/>
      <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
