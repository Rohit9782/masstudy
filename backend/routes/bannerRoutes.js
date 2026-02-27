import express from "express";
import { createBanner, deleteBanner, getBanners } from "../controllers/bannerController.js";
import { userAuth } from "../middleware/userAuth.js";
import { upload } from "../middleware/multer.js";
import { adminOnly } from "../middleware/admin.js";

const router = express.Router();

router.get("/all", getBanners);

router.post(
  "/create", adminOnly,
  userAuth,
  upload.single("image"),
  createBanner
);

router.delete("/delete/:id", adminOnly, userAuth, deleteBanner);

export default router;