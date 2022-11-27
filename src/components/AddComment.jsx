import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import useFirebase from '../helpers/firebase';
import Comments from './Comments'
const AddComment = ({card}) => {
  const {id} = card;
const {useCommentRead,addUserComment} = useFirebase();
const {commentList,isLoading,setCommentList} = useCommentRead();
    const DATE = new Date();
  const years = DATE.getFullYear();
   const month = DATE.getMonth();
   const date = DATE.getDate();
   const hours = DATE.getHours();
   const minute = DATE.getMinutes();
   const calendar = `${month}-${date}-${years}`
   const time = `${hours}:${minute}`
   const {currentUser} = useSelector(state=>state.auth)
    const [comment, setComment] = useState({
        text:"",
        calendar:calendar,
        displayName:currentUser.displayName,
        photo:currentUser.photoUrl,
        time:time,
        email:currentUser.email,
        id:card.id
    })
    const handleSubmit = (e)=>{
        e.preventDefault();
        addUserComment({...comment},id)
        setComment("");
    }
  return (
    <>
    <div className="flex justify-center ">
    <div className=" content-center shadow-md mb-5 mt-20 w-1/2  ">
        <form  className="w-75 p-4" onSubmit={handleSubmit}>
          <label className="block mb-2">
            <span className="text-gray-600">Add a comment</span>
            <textarea maxLength="2000" className="block w-full mt-1 rounded bg-slate-300 text-black " name='text' value={comment.text} onChange={(e)=> setComment({...comment, text:e.target.value})} rows={3}   />
          </label>
          <button className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded" type='submit'>Comment</button>
        </form>
      </div>
    </div>
      <Comments card={card}/>
    </>
  )
}

export default AddComment