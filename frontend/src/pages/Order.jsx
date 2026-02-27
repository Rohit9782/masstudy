import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Order = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchased, setPurchased] = useState(false);
  const [processing, setProcessing] = useState(false);

  const token = localStorage.getItem("token");

  /* =========================
     FETCH SINGLE COURSE
  ========================= */
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `https://masstudy.onrender.com/blog/${id}`
        );

        if (data.success) {
          setBlog(data.blog);
        }
      } catch (error) {
        toast.error("Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  /* =========================
     CHECK IF ALREADY PURCHASED
  ========================= */
  useEffect(() => {
    const checkPurchase = async () => {
      try {
        const { data } = await axios.get(
          "https://masstudy.onrender.com/orders/mycourses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const isPurchased = data.orders.some(
          (order) =>
            order.course?._id === id &&
            order.status === "Paid"
        );

        if (isPurchased) {
          setPurchased(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      checkPurchase();
    }
  }, [id, token]);

  /* =========================
     HANDLE PAYMENT
  ========================= */
  const handlePayment = async () => {
    try {
      if (!token) {
        toast.error("Please login first");
        return navigate("/login");
      }

      setProcessing(true);

      const { data } = await axios.post(
        "https://masstudy.onrender.com/orders/create",
        { courseId: blog._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const options = {
        key: "rzp_test_RrntocmWiDQ2kL",
        amount: data.order.amount,
        currency: "INR",
        name: blog.title,
        description: "Course Purchase",
        order_id: data.order.id,

        handler: async function (response) {
          await axios.post(
            "https://masstudy.onrender.com/orders/verify",
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          toast.success("Payment Successful 🎉");
          navigate("/");
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();

      setProcessing(false);
    } catch (error) {
      setProcessing(false);

      if (
        error.response?.data?.message ===
        "You have already purchased this course"
      ) {
        toast.info("You already purchased this course");
        navigate("/");
      } else {
        toast.error("Payment failed");
      }
    }
  };

  if (loading || !blog)
    return (
      <div className="text-center py-10 text-lg">
        Loading...
      </div>
    );

  const gst = Math.round(blog.price * 0.18);
  const totalAmount = blog.price + gst;

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Checkout
      </h2>

      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT SIDE */}
        <div className="border p-6 rounded-2xl shadow-lg bg-white">
          <img
            src={`https://masstudy.onrender.com/images/${blog.image}`}
            alt={blog.title}
            className="w-full h-60 object-cover rounded-xl"
          />

          <h3 className="text-2xl font-semibold mt-6">
            {blog.title}
          </h3>

          <p className="text-gray-600 mt-3">
            {blog.description}
          </p>

          <div className="mt-6 space-y-2 text-sm text-gray-500">
            <p>✔ Lifetime Access</p>
            <p>✔ Certificate of Completion</p>
            <p>✔ 24/7 Support</p>
            <p>✔ Access on Mobile & Desktop</p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="border p-6 rounded-2xl shadow-lg bg-white h-fit">

          <h3 className="text-xl font-semibold mb-6">
            Payment Summary
          </h3>

          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Course Price</span>
              <span>₹ {blog.price}</span>
            </div>

            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span>₹ {gst}</span>
            </div>

            <hr />

            <div className="flex justify-between font-bold text-lg">
              <span>Total Amount</span>
              <span>₹ {totalAmount}</span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={purchased || processing}
            className={`w-full mt-8 py-3 rounded-xl text-white font-semibold transition ${
              purchased
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {processing
              ? "Processing..."
              : purchased
              ? "Already Purchased"
              : "Proceed to Secure Payment"}
          </button>

          <p className="text-xs text-gray-500 mt-4 text-center">
            🔒 100% Secure Payment via Razorpay
          </p>

          <button
            onClick={() => navigate(-1)}
            className="w-full mt-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
