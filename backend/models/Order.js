import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
      index: true
    },

    amount: {
      type: Number,
      required: true
    },

    currency: {
      type: String,
      default: "INR"
    },

    purchaseDate: {
      type: Date,
      default: Date.now
    },

    expiryDate: {
      type: Date
    },

    isExpired: {
      type: Boolean,
      default: false
    },

    status: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending"
    },

    razorpayOrderId: {
      type: String,
      required: true
    },

    razorpayPaymentId: String,
    razorpaySignature: String
  },
  { timestamps: true }
);

/* =========================
   AUTO SET EXPIRY DATE
========================= */
orderSchema.pre("save", function() {
    this.expiryDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
});

/* =========================
   AUTO EXPIRE CHECK METHOD
========================= */
orderSchema.methods.checkExpiry = function () {
  if (this.expiryDate && new Date() > this.expiryDate) {
    this.isExpired = true;
  }
};

export const Order = mongoose.model("Order", orderSchema);