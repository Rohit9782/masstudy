import fs from "fs";
import path from "path";
import Books from "../models/Books.js";



/* ===== CREATE BOOKS ===== */
export const createBook = async (req, res) => {
    try {
        const { title, category, price, amazonUrl } = req.body;

        if (!req.file) {
            return res.status(400).json({
                message: "Image required"
            });
        }

        const books = await Books.create({
            title, 
            category, 
            price,
            amazonUrl,
            image: req.file.filename
        });

        res.status(201).json({
            success: true,
            message: "Book Created",
            books,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        })
    }
}

/* ===== GET ALL BOOKS ===== */
export const getBooks = async (req, res) => {
    try {
        const books = await Books.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            books,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

/* ===== DELETE BOOKS ===== */
export const deleteBooks = async (req, res) => {
    const books = await Books.findById(req.params.id);
    if (!books) {
        return res.status(404).json({
            message: "Not Found"
        });
    }

    const imagePath = path.join("uploads", books.image);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    await books.deleteOne();
    res.json({
        message: "Book Deleted"
    });
}