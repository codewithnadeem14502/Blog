import React from "react";
import HTMLReactParser from "html-react-parser";

const extractTextContent = (element) => {
  if (!element) {
    return "";
  }

  if (typeof element === "string") {
    return element.trim(); // Trim the string to remove leading and trailing whitespaces
  }

  if (element.props && element.props.children) {
    return React.Children.map(element.props.children, (child) =>
      extractTextContent(child)
    )
      .join(" ")
      .trim(); // Join the children and trim the result
  }

  return "";
};

const getFirst20Words = (text) => {
  if (typeof text !== "string") {
    return ""; // Return an empty string or handle it as needed
  }

  const words = text.split(/\s+/); // Split by any whitespace character
  return words.slice(0, 20).join(" ");
};

const Post = ({ id, file, title, description }) => {
  // Ensure that description is a string before parsing
  const contentElement = HTMLReactParser(description || "");

  // Extract text content from the React element
  const contentString = extractTextContent(contentElement);

  // Function to get the first 20 words from a given string
  const truncatedContent = getFirst20Words(contentString);

  return (
    <div
      key={id}
      className="flex flex-col mb-8 p-6 bg-white rounded-lg hover:shadow-lg transition duration-300 border border-gray-300 sm:flex-row"
    >
      <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
        <img
          src={`http://localhost:9000/Images/${file}`}
          alt={title}
          className="w-full h-60 object-cover rounded-lg shadow-md"
        />
      </div>
      <div className="w-full sm:w-1/2 pl-0 sm:pl-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
        <p className="text-gray-600">{truncatedContent}</p>

        <span className="text-blue-500 cursor-pointer ml-1">Read More</span>
      </div>
    </div>
  );
};

export default Post;
