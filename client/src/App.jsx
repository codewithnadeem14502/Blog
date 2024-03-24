import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Create from "./pages/Create";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import DetailPost from "./pages/DetailPost";
import Edit from "./components/Edit";

export const userContext = createContext();

const App = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [user, setUser] = useState(null);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    // console.log("UseContext ", token);
    axios
      .get(`${URL}/api/v1/user/`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <userContext.Provider value={user}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/DetailPost/:id" element={<DetailPost />} />
          <Route path="/About" element={<About />} />
          <Route path="/create" element={<Create />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/editpost/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
};

export default App;
