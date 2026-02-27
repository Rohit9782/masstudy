import express from "express";
import { userAuth } from "../middleware/userAuth.js";
import { upload } from "../middleware/multer.js";
import { createLive_course, deleteLive_course, getLive_course } from "../controllers/live_courseController.js";
import { adminOnly } from "../middleware/admin.js";


const router = express.Router();

router.post('/create', adminOnly, userAuth, upload.single('image'), createLive_course);
router.get('/all', getLive_course);
router.delete('/delete/:id', adminOnly, userAuth, deleteLive_course);

export default router;