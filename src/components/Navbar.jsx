import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import avatar from "../assets/user-286.png"
import useFirebase from "../helpers/firebase";
const Navbar = () => {
  const auth = useSelector(state => state.auth);
  const {logout} = useFirebase()
  return (
    <>
    <nav className="w-full flex flex-wrap items-center
     justify-between py-3 bg-gray-900 text-white shadow-lg navbar navbar-expand-lg fixed-top">
    <div className="container-fluid w-full flex items-center justify-between px-6">
      <Link className="text-2xl  pr-2 font-semibold" to="/">
        Blogg app
      </Link>

      <div className="flex items-center relative">
        {/* Icon */}
        {auth && (
          <h5 className="mr-2 capitalize">{auth.currentUser?.displayName}</h5>
          )}
        <div className="dropdown relative">
          <span
            className="dropdown-toggle flex items-center hidden-arrow"
            id="dropdownMenuButton2"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            >
            <img
              src={auth.currentUser?.photoURL || avatar}
              className="rounded-full"
              style={{ height: 25, width: 25 }}
              alt="user"
              loading="lazy"
              />
          </span>
          <ul
            className="dropdown-menu min-w-max absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none left-auto right-0"
            aria-labelledby="dropdownMenuButton2"
            >
            {!auth.currentUser ?<li>
              <Link
                className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                to="/register"
                >
                Register
              </Link>
            </li>:""}
           { !auth.currentUser?<li>
              <Link
                className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                to="/login"
                >
                Login
              </Link>
            </li>:""}
             {auth.currentUser ? <li>
               <Link
                 className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                 role="button"
                 to="/profile"
                 >
                 Profile
               </Link>
             </li> : ""
             }
           { <li>
              <Link
                className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                to="/newBlog"
                >
                News Blog
              </Link>
            </li>}
            {auth.currentUser ? <li>
              <span
                className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                role="button"
                onClick={()=> logout() }
                >
                Logout
              </span>
            </li> : ""}
          </ul>
        </div>
      </div>
    </div>
  </nav>
  <div className="h-[52px] "></div>
                </>
  );
};

export default Navbar;
