import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

const SingleBlog = () => {
  const { id } = useParams();
  const { blogData } = useContext(StoreContext);
  const navigate = useNavigate();
  const [purchased, setPurchased] = useState(false);

  const blog = blogData?.find((b) => b._id === id);

  useEffect(() => {
    const checkPurchase = async () => {
      try {
        const { data } = await axios.get(
          "https://masstudy.onrender.com/orders/mycourses",
          { withCredentials: true },
        );

        const isPurchased = data.orders.some(
          (order) => order.course?._id === blog?._id && order.status === "Paid",
        );

        setPurchased(isPurchased);
      } catch (error) {
        console.log(error);
      }
    };

    if (blog) checkPurchase();
  }, [blog]);

  if (!blog) {
    return (
      <div className="text-center py-20 text-xl font-semibold">Loading...</div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 bg-white p-8 rounded-3xl shadow-lg">
          {/* LEFT SIDE IMAGE */}
          <div className="rounded-2xl overflow-hidden shadow-md">
            <img
              src={`https://masstudy.onrender.com/images/${blog.image}`}
              alt={blog.title}
              className="w-full h-100 object-cover hover:scale-105 transition duration-500"
            />
          </div>

          {/* RIGHT SIDE CONTENT */}
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-5">
              {/* CATEGORY */}
              <span className="text-sm bg-blue-100 text-blue-600 px-4 py-1 rounded-full w-fit">
                {blog.category}
              </span>

              {/* TITLE */}
              <h1 className="text-4xl font-bold text-gray-800 leading-tight">
                {blog.title}
              </h1>

              {/* PRICE SECTION */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-blue-600">
                  ₹ {blog.price}
                </span>

                {blog.offPrice && (
                  <span className="text-gray-400 line-through text-xl">
                    ₹ {blog.offPrice}
                  </span>
                )}

                {blog.off > 0 && (
                  <span className="bg-green-100 text-green-700 px-3 py-1 text-sm rounded-full">
                    {blog.off}% off
                  </span>
                )}
              </div>

              {/* DESCRIPTION */}
              <p className="text-gray-600 text-lg leading-relaxed">
                {blog.description}
              </p>

              {/* DATE */}
              {blog.createdAt && (
                <p className="text-sm text-gray-400">
                  Published on{" "}
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>

            {/* BUTTON SECTION */}
            <div className="mt-8">
              {purchased ? (
                <button
                  className="w-full bg-gray-400 text-white py-3 rounded-xl text-lg font-medium cursor-not-allowed"
                  disabled
                >
                  Already Purchased
                </button>
              ) : (
                <button
                  onClick={() => navigate(`/order/${blog._id}`)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold transition duration-300 shadow-md hover:shadow-lg"
                >
                  Buy Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
