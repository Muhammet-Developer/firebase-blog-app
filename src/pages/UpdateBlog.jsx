import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useFirebase from '../helpers/firebase';
const UpdateBlog = () => {
  const {state:card} = useLocation();
  console.log(card);
  const [card2, setCard2] = useState(card)
  const navigate = useNavigate();
  const {updateUser} = useFirebase();
  const handleChange = (e)=>{
    e.preventDefault();
    const {name,value} = e.target;
    setCard2({...card2, [name]:value})
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    updateUser(card2,navigate)
    setCard2("")
  }

  return (
    <>
      <img className="w-96 h-96 rounded-full mx-auto" 
      src={card2.imgUrl} 
      alt="newBlog" ></img>

      <form onSubmit={handleSubmit} >
      <h2 className='text-center'>-----Update Blog-----</h2>
      <div>
        <input className='
        bg-gray-50 border
        border-gray-300
        text-gray-900 text-sm rounded-lg
        focus:ring-blue-500
        focus:border-blue-500 block
        w-80
        mt-2
        mx-auto
        p-3.5
        dark:bg-gray-700 dark:border-gray-600
        dark:placeholder-gray-400 dark:text-white
        dark:focus:ring-blue-500
        dark:focus:border-blue-500
        ' type="text" 
        placeholder='title'
        name="title"
        value={card2.title || ""}
        onChange={handleChange } 
        />
     <input className='
        bg-gray-50 border
        border-gray-300
        text-gray-900 text-sm rounded-lg
         focus:ring-blue-500
         focus:border-blue-500 block
         w-80 p-2.5
         mt-2
         mx-auto
         dark:bg-gray-700 dark:border-gray-600
         dark:placeholder-gray-400 dark:text-white
         dark:focus:ring-blue-500
         dark:focus:border-blue-500
         ' type="url"  placeholder='İmage Url' 
         name="imgUrl"
         value={card2.imgUrl||""}
        onChange={handleChange } 
        />

        <textarea id="message" rows={4} 
        className="block p-2.5  text-sm
        mt-2
        text-gray-900 bg-gray-50 rounded-lg border
        border-gray-300 focus:ring-blue-500 w-80 mx-auto
        focus:border-blue-500 dark:bg-gray-700
        dark:border-gray-600 dark:placeholder-gray-400
        dark:text-white dark:focus:ring-blue-500
        dark:focus:border-blue-500" 
        placeholder="Write your thoughts here..."
        name="explanation"
        value={card2.explanation || ""}
        onChange={handleChange }
         />
        
      </div>
      <div className='flex flex-col items-center mt-2'>
        <button type="submit"  
        className="focus:outline-none w-80  
         text-white bg-green-700 hover:bg-green-800
          focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Update</button>
      </div>

        </form>
        </>
  )
}

export default UpdateBlog