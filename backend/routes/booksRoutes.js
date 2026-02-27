import express from "express";
import { userAuth } from "../middleware/userAuth.js";
import { createBook, deleteBooks, getBooks } from "../controllers/booksController.js";
import { upload } from "../middleware/multer.js";
import { adminOnly } from "../middleware/admin.js";


const router = express.Router();

router.post('/create', adminOnly, userAuth, upload.single('image'), createBook);
router.get('/all', getBooks);
router.delete('/delete/:id', adminOnly, userAuth, deleteBooks);

export default router;