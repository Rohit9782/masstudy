import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({
  id,
  _id,
  title,
  category,
  description,
  price,
  offPrice,
  off,
  image,
}) => {
  const IMAGE_BASE_URL = "http://localhost:5000/images";
  const blogId = id || _id;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 border border-gray-100">
      {/* IMAGE */}
      <div className="overflow-hidden">
        <img
          src={
            image
              ? `${IMAGE_BASE_URL}/${image}`
              : "https://via.placeholder.com/400x250"
          }
          alt={title}
          className="w-full h-70 object-cover hover:scale-105 transition duration-500"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {/* CATEGORY */}
        {category && (
          <span className="inline-block mb-2 text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {category}
          </span>
        )}

        {/* TITLE */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {title}
        </h2>

        {/* DESCRIPTION */}
        {description && (
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">
            {description}
          </p>
        )}

        {/* PRICE SECTION */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600">₹{price}</span>

            {offPrice && (
              <span className="text-gray-400 line-through text-lg">
                ₹{offPrice}
              </span>
            )}
          </div>

          {off > 0 && (
            <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
              {off}% off
            </span>
          )}
        </div>

        {/* BUTTON */}
        <Link
          to={`/blog/${blogId}`}
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
