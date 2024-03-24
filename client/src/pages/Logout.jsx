// src/components/Logout.js
import React, { useState, useContext } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";
const Logout = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [cookies, setCookie, removeCookie] = useCookies(["access-token"]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const user = useContext(userContext);
  const handleLogout = async () => {
    try {
      const response = await axios.post(`${URL}/api/v1/user/logout`);

      if (response.data.message === "Logout Successful") {
        removeCookie("access-token");
        const message = "Logout Successful";
        enqueueSnackbar(message, { variant: "success" });
        setTimeout(() => {
          navigate(0);
        }, 1000);
        navigate(0);
      } else {
        setLogoutMessage("Logout Failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const username = user.username;
  return (
    <div>
      <button
        className="text-black bg-slate-200 text-sm md:text-lg font-semibold hover:bg-black hover:text-white p-3 rounded-md "
        onClick={handleLogout}
      >
        Logout ({username})
      </button>
    </div>
  );
};

export default Logout;
