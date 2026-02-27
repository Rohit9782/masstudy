import razorpayInstance from "../config/razorpay.js";
import { Order } from "../models/Order.js";
import crypto from "crypto";
import { Blog } from "../models/Blog.js";

/* =========================
   CREATE ORDER
========================= */
export const createOrder = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Blog.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const price = Number(course.price);

    if (!price || price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid course price",
      });
    }

    // 🔎 Check if already purchased & not expired
    const alreadyPurchased = await Order.findOne({
      user: req.user._id,
      course: courseId,
      status: "Paid",
      expiryDate: { $gt: new Date() },
    });

    if (alreadyPurchased) {
      return res.status(400).json({
        success: false,
        message: "You have already purchased this course",
      });
    }

    const options = {
      amount: Math.round(price * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);

    const newOrder = await Order.create({
      user: req.user._id,
      course: course._id,
      amount: price,
      currency: "INR",
      status: "Pending",
      razorpayOrderId: razorpayOrder.id,
    });

    return res.json({
      success: true,
      order: razorpayOrder,
      dbOrder: newOrder,
    });
  } catch (error) {
    console.error("❌ Error in createOrder:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   VERIFY PAYMENT
========================= */
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      paymentFailed,
    } = req.body;

    const order = await Order.findOne({
      razorpayOrderId: razorpay_order_id,
      user: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // 🔴 If payment failed
    if (paymentFailed) {
      order.status = "Failed";
      await order.save();

      return res.status(400).json({
        success: false,
        message: "Payment Failed",
      });
    }

    // 🔐 Verify Signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      order.status = "Failed";
      await order.save();

      return res.status(400).json({
        success: false,
        message: "Invalid Signature",
      });
    }

    // ✅ Mark as Paid
    order.status = "Paid";
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;

    // ✅ Set Expiry (1 Year)
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    order.expiryDate = expiryDate;

    await order.save();

    return res.json({
      success: true,
      message: "Payment Successful",
      order,
    });
  } catch (error) {
    console.error("❌ Error in verifyPayment:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   GET MY COURSES
========================= */
export const getMyCourses = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
      status: "Paid",
      expiryDate: { $gt: new Date() },
    })
      .populate({
        path: "course",
        select: "title price image",
      })
      .populate("user", "firstName lastName email");

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Error fetching user order:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   ADMIN: GET USER ORDERS
========================= */
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ user: userId })
      .populate({
        path: "course",
        select: "title price image",
      })
      .populate("user", "firstName lastName email");

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.log("Error fetching user order:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};