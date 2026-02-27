import React, { useContext } from "react";
import BlogCard from "./BlogCard";
import { StoreContext } from "../context/StoreContext";

const LatestBlogs = () => {
  const { blogData = [] } = useContext(StoreContext);

  return (
    <div className="max-w-7xl mx-auto">

      {/* HEADING */}
      <div className="text-center py-4 bg-linear-to-r from-pink-500 to-red-500 rounded-2xl text-white text-3xl md:text-4xl font-bold shadow-lg">
        Latest Courses
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-10 px-4">
        {blogData.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No blogs found
          </p>
        ) : (
          blogData
            .slice(-8) // thode kam card rakhe taki bade lage
            .reverse()
            .map((blog) => (
              <BlogCard
                key={blog._id}
                id={blog._id}
                title={blog.title}
                image={blog.image}
                category={blog.category}
                description={blog.description}
                price={blog.price}
                offPrice={blog.offPrice}
                off={blog.off}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default LatestBlogs;