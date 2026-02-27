import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import blogRoutes from "./routes/blogRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import booksRoutes from "./routes/booksRoutes.js";
import live_courseRoutes from "./routes/live_courseRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cron from "node-cron";
import { Order } from "./models/Order.js";

import { fileURLToPath } from "url";
import path from "path";

dotenv.config();
connectDB();

const app = express();

/* =========================
   PATH SETUP
========================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =========================
   CRON JOB (Daily Expiry Check)
========================= */
cron.schedule("0 0 * * *", async () => {
  try {
    console.log("⏳ Running daily expiry check...");

    const result = await Order.updateMany(
      {
        status: "Paid",
        expiryDate: { $lt: new Date() },
        isExpired: false,
      },
      {
        $set: { isExpired: true },
      }
    );

    console.log(`✅ Expired courses marked: ${result.modifiedCount}`);
  } catch (error) {
    console.error("❌ Cron Job Error:", error);
  }
});

/* =========================
   MIDDLEWARES
========================= */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static(path.join(__dirname, "uploads")));

/* =========================
   ROUTES
========================= */
app.use("/user", userRoutes);
app.use("/blog", blogRoutes);
app.use("/banner", bannerRoutes);
app.use("/books", booksRoutes);
app.use("/live_course", live_courseRoutes);
app.use("/orders", orderRoutes);

/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
  res.status(200).send("🚀 API Running...");
});

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});