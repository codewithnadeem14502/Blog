// src/components/Register.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const URL = import.meta.env.VITE_BACKEND_URL;
    try {
      const respond = await axios.post(
        `${URL}/api/v1/user/register`,

        {
          username,
          email,
          password,
        }
      );
      const message = respond.data.message;
      if (message == "Register Successfully") {
        enqueueSnackbar(message, { variant: "success" });
        navigate("/login");
      } else {
        console.log(message);
        enqueueSnackbar(message, { variant: "error" });
      }
    } catch (error) {
      const message = respond.data.message;
      console.log(error);
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded w-full py-2 px-3"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border rounded w-full py-2 px-3"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <Link to="/login">
            <p className="text-blue-500 my-5 text-sm">
              Do you have account Already?
            </p>
          </Link>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
