// src/components/Navbar.js
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../App";
import Logout from "../pages/Logout";
import axios from "axios";
const Navbar = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const getUser = async () => {
    try {
      const response = await axios.get(`${URL}/login/sucess`, {
        withCredentials: true,
      });

      const accessToken = response.data.token;
      localStorage.setItem("access-token", accessToken);
      // window.location.reload();
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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
