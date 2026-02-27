import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchMyCourses = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/orders/mycourses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setCourses(data.orders);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">
          Loading your courses...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        🎓 My Purchased Courses
      </h1>

      {courses.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>You have not purchased any course yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((order) => {
            const isExpired =
              order.expiryDate &&
              new Date(order.expiryDate) < new Date();

            return (
              <div
                key={order._id}
                className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-300"
              >
                <img
                  src={`http://localhost:5000/images/${order.course?.image}`}
                  alt={order.course?.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">
                    {order.course?.title}
                  </h2>

                  <p className="text-gray-600 mb-2">
                    ₹ {order.course?.price}
                  </p>

                  <p
                    className={`text-sm font-medium ${
                      order.status === "Paid"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    Status: {order.status}
                  </p>

                  {order.expiryDate && (
                    <p className="text-sm text-gray-500">
                      Valid Till:{" "}
                      {new Date(order.expiryDate).toDateString()}
                    </p>
                  )}

                  {isExpired && (
                    <p className="text-red-500 font-medium mt-2">
                      Course Expired
                    </p>
                  )}

                  {/* Button Logic */}
                  {order.status === "Paid" && !isExpired && (
                    <button
                      onClick={() =>
                        navigate(`/courseplayer`)
                      }
                      className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                    >
                      Start Learning
                    </button>
                  )}

                  {isExpired && (
                    <button
                      className="mt-4 w-full bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed"
                      disabled
                    >
                      Access Expired
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyCourses;