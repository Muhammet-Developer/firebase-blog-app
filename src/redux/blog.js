import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

 // const [title,setTitle]
  // const [imgUrl,setİmgUrl]
  // const [explanation,setExplanation]
  //const data,setData = ({})
  const initialState = {
    //   data:[],
      form:{
          title:"",
          imgUrl:"",
          explanation:"",
          displayName:"",
          email:""
        },
        contactList:"",
        isLoading:true
    }
    
    const blogSlice = createSlice({
    name:"blog",
    initialState,
    reducers:{
        setTitle:(state,{payload})=>{
            state.title=payload;
        },
        setİmgUrl:(state,{payload})=>{
            state.imgUrl=payload;
        },
        setExplanation:(state,{payload})=>{
            state.explanation=payload;
        },
        setForm:(state,{payload})=>{
            state.form=payload;
        },
        setContactList:(state,{payload})=>{
            state.contactList=payload;
        },
        setİsLoading:(state)=>state.setİsLoading
    }
})
export const {setTitle,setContactList,setİsLoading,setForm,setİmgUrl,setExplanation,setData}=blogSlice.actions

export default blogSlice.reducer