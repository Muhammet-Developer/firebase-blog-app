import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'tw-elements';
import {Provider} from "react-redux"
import { store } from './redux/Store';
import { ToastContainer } from 'react-toastify';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ToastContainer/>
      <App />
    </Provider>
  </React.StrictMode>
);
