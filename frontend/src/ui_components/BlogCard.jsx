import React from "react";

const BlogCard = () => {
  return (
    <div className="px-3 py-3 rounded-md w-[300px] h-auto flex flex-col gap-4 dark:border-gray-800 border shadow-lg">
      <div className="w-full h-[200px] border rounded-md overflow-hidden">
        <img
          src={thumbnail}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default BlogCard;
