// src/components/Logout.js
import React, { useContext } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";

const Logout = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const user = useContext(userContext);

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${URL}/api/v1/user/logout`);

      if (response.data.message === "Logout Successful") {
        localStorage.removeItem("access-token"); // Remove access token from localStorage upon successful logout
        const message = "Logout Successful";
        enqueueSnackbar(message, { variant: "success" });
        // Reload the page after successful logout
        window.location.reload();
      } else {
        enqueueSnackbar("Logout Failed", { variant: "error" }); // Display error message if logout fails
      }
    } catch (error) {
      console.error("Logout error:", error);
      enqueueSnackbar("An error occurred while logging out", {
        variant: "error",
      }); // Display error message if an error occurs during logout
    }
  };

  return (
    <div>
      <button
        className="text-black bg-slate-200 text-sm md:text-lg font-semibold hover:bg-black hover:text-white p-3 rounded-md"
        onClick={handleLogout}
      >
        Logout ({user.username})
      </button>
    </div>
  );
};

export default Logout;
