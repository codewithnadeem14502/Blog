// src/components/Register.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import google from "../../src/assets/google.svg";
import { useSnackbar } from "notistack";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [googleLoginCompleted, setGoogleLoginCompleted] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BACKEND_URL;
  const HandleSubmit = async (e) => {
    e.preventDefault();
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
  const loginWithGoogle = () => {
    window.open(`${URL}/auth/google/callback`, "_self");
    setGoogleLoginCompleted(true);
    // console.log("google open checker ", setGoogleLoginCompleted);
  };
  return (
    <div className="min-h-screen flex items-center justify-center  my-5">
      <div className="border  p-8 rounded  w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={HandleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-lg font-bold mb-2"
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
              className="block text-gray-700 text-lg  font-bold mb-2"
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
              className="block text-gray-700 text-lg font-bold mb-2"
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
            className="bg-slate-100 border text-lg text-black py-3 px-2 font-bold w-full rounded hover:bg-slate-300"
          >
            Register
          </button>
        </form>
        <div className="flex justify-center items-center my-5">
          <hr className="border-gray-400 w-[30%] mr-2" />
          <p className="text-gray-600 mx-2 font-medium">or Sign up </p>
          <hr className="border-gray-400 w-[30%]  ml-2" />
        </div>
        <div className="my-5 flex justify-center">
          <button
            className="w-full  text-lg bg-white border text-black shadow-sm px-4 py-3  rounded-md flex items-center justify-center"
            onClick={loginWithGoogle}
          >
            <img src={google} alt="google" className="mr-2" />
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
