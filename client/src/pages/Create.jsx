import React, { useState, useContext, useRef } from "react";
import { userContext } from "../App";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";

const Create = () => {
  const editor = useRef(null);

  const user = useContext(userContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BACKEND_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("username", user.username);

    try {
      const token = localStorage.getItem("access-token");
      if (!token) {
        throw new Error("No token found");
      }

      const config = {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      };

      const respond = await axios.post(
        `${URL}/api/v1/post/create`,
        formData,
        config
      );

      const message = respond.data.message;
      if (message === "Created Successfully") {
        enqueueSnackbar(message, { variant: "success" });
        navigate("/");
      } else {
        enqueueSnackbar(message, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar(error.message || "An error occurred", {
        variant: "error",
      });
    }
  };

  const handleDescription = (content) => {
    const parsedContent = HTMLReactParser(content);
    setDescription(parsedContent);
  };
  return (
    <div className="container mx-auto my-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter the title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="desc"
              className="block text-sm font-medium text-gray-600"
            >
              Description
            </label>
            {/* <textarea
              name="desc"
              id="desc"
              className="mt-1 p-2 border rounded w-full"
              rows="5"
              placeholder="Write your post description here"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea> */}
            <JoditEditor
              ref={editor}
              value={description}
              tabIndex={1}
              className="mt-1 p-2 border rounded w-full"
              onChange={(description) => setDescription(description)}
            />
          </div>
          <div>
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-600"
            >
              Attach File
            </label>
            <input
              type="file"
              name="file"
              id="file"
              className="mt-1"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
