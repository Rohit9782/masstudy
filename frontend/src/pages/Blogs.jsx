import React, { useEffect, useState } from "react";
import axios from "axios";

const Blogs = () => {
  const [liveCourse, setLiveCourse] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

  useEffect(() => {
    const fetchLiveCourse = async () => {
      try {
        const res = await axios.get(`${API_BASE}/live_course/all`);
        setLiveCourse(res.data.live_course);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLiveCourse();
  }, [API_BASE]);

  return (
    <div className="px-4 max-w-7xl mx-auto py-6 bg-gray-100 min-h-screen">
      {/* Heading */}
      <div className="text-center py-8 bg-linear-to-r from-pink-600 to-red-600 rounded-2xl text-white text-4xl font-bold shadow-lg">
        Upcoming Courses
      </div>

      {/* Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {liveCourse.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No Upcoming Courses Found
          </p>
        ) : (
          liveCourse.map((course) => (
            <div
              key={course._id}
              onClick={() => {
                setSelectedCourse(course);
                setIsOpen(true);
              }}
              className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition duration-300 cursor-pointer overflow-hidden border border-gray-200"
            >
              {/* Course Image */}
              <div className="relative">
                <img
                  src={`${API_BASE}/images/${course.image}`}
                  alt={course.title}
                  className="w-full h-52 object-cover"
                />

                {/* Discount Badge */}
                <div className="absolute top-3 right-3 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full shadow">
                  {course.discount}% off
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
                  {course.title}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {course.description}
                </p>

                {/* Price */}
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-red-600">
                    ₹{course.nowPrice}
                  </span>
                  <span className="text-gray-400 line-through text-lg">
                    ₹{course.beforePrice}
                  </span>
                </div>

                {/* View Button */}
                <button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl font-semibold transition cursor-pointer">
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ================= MODAL ================= */}
      {isOpen && selectedCourse && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white w-[95%] md:w-225 rounded-3xl shadow-2xl overflow-hidden relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-5 text-3xl font-bold text-gray-500 hover:text-red-600"
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2">
              {/* LEFT IMAGE */}
              <div className="bg-gray-100 p-6 flex items-center justify-center">
                <img
                  src={`${API_BASE}/images/${selectedCourse.image}`}
                  alt={selectedCourse.title}
                  className="rounded-2xl shadow-lg max-h-87.5 object-cover"
                />
              </div>

              {/* RIGHT CONTENT */}
              <div className="p-8 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                  {selectedCourse.title}
                </h2>

                <p className="text-gray-600 mb-6">
                  {selectedCourse.description}
                </p>

                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-bold text-red-600">
                    ₹{selectedCourse.nowPrice}
                  </span>
                  <span className="text-gray-400 line-through text-xl">
                    ₹{selectedCourse.beforePrice}
                  </span>
                </div>

                <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold w-fit mb-6">
                  {selectedCourse.discount}% OFF
                </span>

                <button className="bg-red-400 hover:bg-red-500 text-white py-3 rounded-2xl text-lg font-semibold transition shadow-lg cursor-not-allowed">
                  Upcoming Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;





















