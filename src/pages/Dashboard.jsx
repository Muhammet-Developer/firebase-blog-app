import React, { useEffect } from 'react'
import useFirebase from '../helpers/firebase'
import avatar from "../assets/user-286.png"
import { useNavigate } from 'react-router-dom';
import CardLoader from '../components/CardLoader';
const Dashboard = () => {
const {useRead,useCommentRead} = useFirebase();
const {contactList,isLoading} = useRead();
// const auth = useSelector(state => state.auth)
// const {form} = useSelector(state => state.blog)
const navigate = useNavigate();
useEffect(() => {

}, [contactList])

return (
    <>

    <div className="grid xl:grid-cols-4 lg:grid-cols-3  md:grid-cols-2" >
    {
    isLoading ? 
    contactList?.map((asd)=>{
      return(

        <CardLoader/>
        )
    })
    :
     contactList?.lenght === 0 ? (
      <h1>No Data</h1>
    ): contactList?.map((person,index)=>{
      const {displayName,email,explanation,id,imgUrl,title,calendar,comment} = person;
      var count = 0;
      for(let key in comment){
        count++
      }
      
      return(
        <>
        <div key={index} className="mx-auto px-4 py-8 max-w-xl w-11/12 cursor-pointer "  onClick={()=> navigate("details/"+id,{state:person})}>
        <div className="bg-white shadow-2xl rounded-lg  tracking-wide">
        {isLoading ? <CardLoader/> :
          <>
        <div className="md:flex-shrink-0">
        <img src={imgUrl} alt="mountains" className="w-full h-64 rounded-lg rounded-b-none" />
        </div>
        <div className="px-4 py-2 mt-2 bg-slate-100">
        <h2 className="font-bold text-2xl text-gray-800 tracking-normal">{title}</h2>
        <p className="text-sm text-gray-700 px-2 mr-1 truncate ">
          {explanation}
        </p>
        <div className="flex items-center justify-between mt-2 mx-6">
          <button onClick={()=> navigate("details/"+id,{state:person})} className="text-blue-500 text-xs -ml-3 ">Details</button>
              <div className="flex text-gray-700">
              <svg fill="none" viewBox="0 0 24 24" className="w-6 h-6 text-blue-500" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              {count}
            {id === comment ? {count}:""}
            </div>
            </div>
        <div className="author flex items-center -ml-3 my-3">
        <div className="user-logo">
        <img className="w-12 h-12 object-cover rounded-full mx-4  shadow" src={avatar} alt="avatar" />
        </div>
        <h2 className="text-sm tracking-tighter text-gray-900">
        <p>{displayName || email}</p> <span className="text-gray-600">{calendar}</span>
        </h2>
        </div>
      </div>
        </>
      }
      </div>
      </div>
    </>
      )})}
      </div>
    
    </>
  )
}

export default Dashboard