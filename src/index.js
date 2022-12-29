import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'tw-elements';
import {Provider} from "react-redux"
import { persistor, store } from './app/Store';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <PersistGate persistor={persistor}> 
    <ToastContainer/>
      <App />
      </PersistGate>
    </Provider>
);
