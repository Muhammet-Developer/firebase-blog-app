import React from 'react'
import img from "../assets/newBlog.png"
import BlogForm from '../components/BlogForm'

const NewBlog = () => {

  return (
    <>
      <img className="w-96 h-96 rounded-full mx-auto" 
      src={img} alt="newBlog"/>
      <BlogForm/>
      </>    
  )
}

export default NewBlog