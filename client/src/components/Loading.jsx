// Loading.js

import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-4">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-12 w-12"></div>
      </div>
      <div className="text-xl font-semibold text-gray-700">
        <span className="mr-2">Loading...</span>
        <span className="animate-pulse text-blue-500">Please wait</span>
      </div>
    </div>
  );
};

export default Loading;
