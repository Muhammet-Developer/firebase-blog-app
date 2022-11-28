import {createSlice} from "@reduxjs/toolkit";
const initialState={
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    currentUser:false

}
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setFirstName :(state,{payload})=>{
            state.firstName = payload;
        },
        setLastName :(state,{payload})=>{
            state.lastName = payload;
        },
        setEmail :(state,{payload})=>{
            state.email = payload;
        },
        setPassword :(state,{payload})=>{
            state.password = payload;
        },
        setCurrentUser : (state,{payload})=>{
            state.currentUser =payload;
        }
    }
    
})

export const {setFirstName,setLastName,setEmail,setPassword,setCurrentUser} = authSlice.actions

export default authSlice.reducer