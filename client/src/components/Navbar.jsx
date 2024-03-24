// src/components/Navbar.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../App";
import Logout from "../pages/Logout";
const Navbar = () => {
  const user = useContext(userContext);
  // console.log("user ,", user);
  return (
    <div className="flex justify-between items-center text-center bg-slate-50 p-5  border-b border-black">
      <h1 className="text-black text-lg md:text-3xl font-bold hover:bg-black hover:text-white p-3 rounded-md ">
        <Link to="/">Quillify</Link>
      </h1>
      <div className="flex space-x-4">
        {user != null && user?.username && (
          <Link
            to="/create"
            className="text-black text-sm md:text-lg font-semibold bg-slate-200 hover:bg-black hover:text-white p-3 rounded-md "
          >
            Create
          </Link>
        )}
      </div>
      {user != null && user?.username ? (
        <Logout />
      ) : (
        <Link
          to="/login"
          className="text-black text-lg font-semibold bg-slate-200 hover:bg-black hover:text-white p-3 rounded-md "
        >
          Login/Register
        </Link>
      )}
    </div>
  );
};

export default Navbar;
