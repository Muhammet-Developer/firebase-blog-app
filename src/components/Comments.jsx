import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useFirebase from '../helpers/firebase';
import CommentModal from './CommentModal';
import Avatar from "../assets/user-286.png"
import { useSelector } from 'react-redux';

const Comment = ({card}) => {
  const {useCommentRead,} = useFirebase();
  const name = card;
  const {id:idTypes} = name;
  const {commentList,isLoading,setCommentList} = useCommentRead(idTypes);
  const [openModal, setOpenModal] = useState(false);
  const {commentDeleteUser} = useFirebase();
  const navigate = useNavigate()
  const {currentUser} = useSelector(state => state.auth)

  return (
    <>
    {commentList?.map((item,index)=>{
      const {id,text} = item;
    return(
      <div className=" relative top-1/3 content-center flex justify-center " key={index}>
        <div className="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg  w-1/2">
          <div className="relative flex gap-4 " >
            <img src={Avatar} className="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20" alt="" loading="lazy" />
            <div className="flex flex-col w-full">
              {currentUser?.email === commentList?.email ? 
              <div className="flex flex-row justify-between">
                <p className="relative text-2xl whitespace-nowrap truncate overflow-hidden">{item.displayName}</p>
                <a className="text-gray-500 text-xl" ><i className="fa-solid fa-trash" onClick={()=> commentDeleteUser(idTypes,id)} /> 
                <i className="fa-solid fa-pen-to-square ml-1"  
                onClick={() =>{setOpenModal(true) 
                }}></i></a>
              </div>
              :""}
                <p className="relative text-lg whitespace-nowrap truncate overflow-hidden">{item.email}</p>
              <p className="text-gray-400 text-sm">
                {item.calendar}, {item.time}
              </p>
            </div>
          </div>
          <p className="-mt-4 text-gray-500 ">{text}</p>
        </div>
        <CommentModal open={openModal} commentList={commentList} onClose={() => setOpenModal(false)} 
         />
      </div>
)
})}
    </>
    
  )
}

export default Comment