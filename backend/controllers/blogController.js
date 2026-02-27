import Blog from "../models/Blog.js";
import fs from "fs";
import path from "path";

/* ===================== ALL BLOGS ===================== */
export const allBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "All Blogs",
            blogs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* ===================== CREATE BLOG ===================== */
export const createBlog = async (req, res) => {
    try {
        const { title, category, description, price, offPrice, off } = req.body;

        if (!title || !category || !description || !price || !offPrice || !off ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required",
            });
        }

        const blog = await Blog.create({
            title,
            category,
            description,
            price,
            offPrice,
            off,
            image: req.file.filename,
            user: req.user._id, // ✅ important
        });

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            blog,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* ===================== DELETE BLOG ===================== */
export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        // ✅ Delete image safely
        const imagePath = path.join(process.cwd(), "uploads", blog.image);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await blog.deleteOne();

        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* ===================== SINGLE BLOG ===================== */
export const singleBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Blog Found",
            blog,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* ===================== USER BLOGS ===================== */
export const userBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({
            user: req.user._id, // ✅ FIXED
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            blogs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};