import express from "express";
import { userAuth } from "../middleware/userAuth.js";
import { createOrder, getMyCourses, getUserOrders, verifyPayment } from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", userAuth, createOrder);
router.post("/verify", userAuth, verifyPayment);
router.get("/mycourses", userAuth, getMyCourses);
router.get("/user-order/:userId", userAuth, getUserOrders);

export default router;