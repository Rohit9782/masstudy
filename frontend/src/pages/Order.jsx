import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const Order = () => {
  const { id } = useParams();
  const { blogData } = useContext(StoreContext);
  const navigate = useNavigate();

  const [purchased, setPurchased] = useState(false);
  const [loading, setLoading] = useState(true);

  const blog = blogData?.find((b) => b._id === id);

  /* =========================
     CHECK IF ALREADY PURCHASED
  ========================= */
  useEffect(() => {
    const checkPurchase = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/orders/mycourses",
          { withCredentials: true }
        );

        const isPurchased = data.orders.some(
          (order) =>
            order.course?._id === id &&
            order.status === "Paid"
        );

        if (isPurchased) {
          toast.info("You already purchased this course");
          navigate("/");
        }

        setPurchased(isPurchased);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    checkPurchase();
  }, [id, navigate]);

  /* =========================
     HANDLE PAYMENT
  ========================= */
  const handlePayment = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/orders/create",
        { courseId: blog._id },
        { withCredentials: true }
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
            "http://localhost:5000/orders/verify",
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            },
            { withCredentials: true }
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

    } catch (error) {
      console.log(error.response?.data);

      if (error.response?.data?.message === "You have already purchased this course") {
        toast.info("You already purchased this course");
        navigate("/");
      } else {
        toast.error("Please login first");
      }
    }
  };

  if (!blog || loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

      <div className="border p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold">{blog.title}</h3>
        <p className="text-gray-600 mt-2">{blog.description}</p>
        <p className="text-green-600 text-xl font-bold mt-4">
          ₹ {blog.price}
        </p>

        <button
          onClick={handlePayment}
          disabled={purchased}
          className={`mt-6 px-6 py-2 rounded-lg text-white ${
            purchased
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {purchased ? "Already Purchased" : "Proceed to Pay"}
        </button>
      </div>
    </div>
  );
};

export default Order;
