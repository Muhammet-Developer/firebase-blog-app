import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./auth";
import blogReducer from "./blog";
export const store = configureStore({
    reducer:{
        auth: authReducer,
        blog:blogReducer
    }
})