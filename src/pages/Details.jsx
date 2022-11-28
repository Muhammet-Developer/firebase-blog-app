import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import AddComment from '../components/AddComment';
import useFirebase from '../helpers/firebase';
const Details = () => {
  const {id}= useParams();
  const {state:card} = useLocation();
  const navigate = useNavigate()
  const {deleteUser} = useFirebase();
  const {currentUser} = useSelector(state => state.auth)
  useEffect(() => {
   
  }, [card])
  

  return (
    <>
      {/* Container */}
      <div className="container mt-32 mx-auto p-4 md:p-0" key={card?.index}>
        {/* Card wrapper */}
        <div className="shadow-lg flex flex-wrap w-full lg:w-4/5 mx-auto">
          {/* Card image */}
          <div
            className="bg-cover bg-bottom border w-full md:w-1/3 h-64 md:h-auto relative object-cover"
            style={{ backgroundImage: `url(${card?.imgUrl})`}}
          >
            <div className="absolute text-xl">
              <i className="fa fa-heart text-white hover:text-red-light ml-4 mt-4 cursor-pointer" />
            </div>
          </div>
          {/* ./Card image */}
          {/* Card body */}
          <div className="bg-white w-full md:w-2/3">
            {/* Card body - outer wrapper */}
            <div className="h-full mx-auto px-6 md:px-0 md:pt-6 md:-ml-6 relative">
              {/* Card body - inner wrapper */}
              <div className="bg-white lg:h-full p-6 -mt-6 md:mt-0 relative mb-4 md:mb-0 flex flex-wrap md:flex-wrap items-center">
                {/* Card title and subtitle */}
                <div className="w-full lg:w-1/5 lg:border-right lg:border-solid text-center md:text-left ">
                  <h3>{card?.title}</h3>
                  
                  <hr className="w-1/4 md:ml-0 mt-4  border lg:hidden" />
                </div>
                {/* ./Card title and subtitle */}
                {/* Card description */}
                <div className="w-full lg:w-3/5 lg:px-3">
                  <p className="text-md mt-4 lg:mt-0 text-justify md:text-left text-sm">
                    {card?.explanation}
                  </p>
                </div>
                {/* ./Card description */}
                {/* Call to action button */}
                <div className="w-full lg:w-2/5 mt-6 lg:mt-0 lg:px-4 text-center md:text-left">
                  <button className="bg-white hover:bg-grey-darker border border-solid border-grey w-1/3 lg:w-full py-2">
                    {card?.email}
                  </button>
                </div>
                {/* ./Call to action button */}
              </div>
              {currentUser?.email === card?.email ? 
              <div>
              <div>
                <button
                  type="button"
                  className="focus:outline-none w-80 mt-5
    text-white bg-red-700 hover:bg-red-800
    focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-grereden-700 dark:focus:ring-red-800"
    onClick={() => deleteUser(card?.id, navigate)}
    >
                  Delete
                </button>
              </div>

              <div >
                <button
                  type="button"
                  onClick={() => navigate("/update/", { state: card })}
                  className="focus:outline-none w-80 
                  text-white bg-green-700 hover:bg-green-800
    focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
    >
                  Update
                </button>
              </div>
                  </div>: 
                  <button
                  type="button"
                  onClick={() =>  navigate(-1)}
                  className="focus:outline-none w-80  mt-3 
                  text-white bg-orange-500 hover:bg-yellow-800
    focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
    >
                  Back
                </button>
              }
              
              {/* ./Card body - inner wrapper */}
            </div>
            {/* ./Card body - outer wrapper */}
          </div>
          {/* ./Card body */}
        </div>

        {/* ./Card wrapper */}
      </div>
      {currentUser?.email === card?.email ? 
      <div className="mt-10">
        <AddComment  card={card}/>
      </div> : <AddComment  card={card}/>

    }
      {/* ./Container */}
    </>
  );
}

export default Details
