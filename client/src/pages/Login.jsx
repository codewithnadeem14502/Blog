import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const URL = import.meta.env.VITE_BACKEND_URL;
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const respond = await axios.post(`${URL}/api/v1/user/login`, {
        username,
        password,
      });

      const accessToken = respond.data.token;
      console.log("token from login ", accessToken);
      localStorage.setItem("access-token", accessToken); // Store token in local storage

      const message = respond.data.message;
      if (message === "Login Successfully") {
        enqueueSnackbar(message, { variant: "success" });
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        enqueueSnackbar(message, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar(error.message || "An error occurred", {
        variant: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={HandleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="border rounded w-full py-2 px-3"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border rounded w-full py-2 px-3"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link to="/register">
            <p className="text-blue-500 my-5 text-sm">Create a new Account?</p>
          </Link>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
