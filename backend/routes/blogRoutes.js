import express from "express";
import { userAuth } from "../middleware/userAuth.js";
import { upload } from "../middleware/multer.js";
import { allBlogs, createBlog, deleteBlog, userBlogs } from "../controllers/blogController.js";
import { adminOnly } from "../middleware/admin.js";

const router = express.Router();

router.post('/create', userAuth, adminOnly, upload.single('image'), createBlog);
router.get('/all', allBlogs);
router.delete('/delete/:id', userAuth, adminOnly, deleteBlog);
router.get('/user/blogs', userAuth, userBlogs);

export default router;