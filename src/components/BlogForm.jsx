import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import useFirebase from '../helpers/firebase';
import {setForm } from '../features/blog'

const BlogForm = () => {
  const {AddUser} = useFirebase()
    const {form} = useSelector(state=> state.blog)
    const {currentUser} = useSelector(state=>state.auth)
    const navigate = useNavigate()
    const time = new Date();
    const years = time.getFullYear();
     const month = time.getMonth();
     const date = time.getDate();
     const calendar = `${month}-${date}-${years};`
  
    const dispatch = useDispatch()
  
    const handleSubmit = (e) =>{
      e.preventDefault();
      AddUser({...form,email:currentUser.email,
        displayName:currentUser.displayName,calendar:calendar},navigate);
        // const {name,value} = e.target;
        dispatch(setForm({}))
      }
        

    
  return (
    <form onSubmit={handleSubmit}>
      <h2 className='text-center'>-----New Blog-----</h2>
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
        value={form.title}
        // onChange={handleSubmit}
         onChange={(e)=> dispatch(setForm({...form, title:e.target.value})) } 
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
         value={form.imgUrl}
        //  onChange={handleSubmit}

        onChange={(e)=> dispatch(setForm({...form, imgUrl:e.target.value})) } 
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
        value={form.explanation}
        onChange={(e)=> dispatch(setForm({...form, explanation:e.target.value})) }
         />
        
      </div>
      <div className='flex flex-col items-center mt-2'>
        <button type="submit"
        className="focus:outline-none w-80  
         text-white bg-green-700 hover:bg-green-800
          focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
      </div>

        </form>
  )
}

export default BlogForm