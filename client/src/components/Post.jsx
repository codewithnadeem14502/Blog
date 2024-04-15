import React from "react";

const Post = ({ id, file, title, description }) => {
  // Function to strip HTML tags and return only text content
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  // Extracting text content without HTML tags
  const strippedDescription = stripHtmlTags(description);
  const URL = import.meta.env.VITE_BACKEND_URL;
  return (
    <div
      key={id}
      className="flex flex-col mb-8 p-6 bg-white rounded-lg hover:shadow-lg hover:border-black transition duration-300 border border-gray-300 sm:flex-row"
    >
      <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
        <img
          src={`${URL}/Images/${file}`}
          alt={title}
          className="w-full h-60 object-cover rounded-lg shadow-md"
        />
      </div>
      <div className="w-full sm:w-1/2 pl-0 sm:pl-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
        <p className="text-gray-600 line-clamp-5">{strippedDescription}</p>

        <span className="text-blue-500 cursor-pointer ml-1">Read More</span>
      </div>
    </div>
  );
};

export default Post;
