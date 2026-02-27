import Banner from "../models/Banner.js";
import fs from "fs";
import path from "path";

/* ===== CREATE BANNER ===== */
export const createBanner = async (req, res) => {
    try {
        const { title, description, price } = req.body;

        if (!req.file) {
            return res.status(400).json({
                message: "Image required"
            });
        }

        const banner = await Banner.create({
            title, 
            description, 
            price,
            image: req.file.filename,
        });

        res.status(201).json({
            success: true,
            message: "Banner created",
            banner,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
}


/* ===== GET ALL BANNERS ===== */
export const getBanners = async (req, res) => {
    try {
        const banners = await Banner.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            banners,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

/* ===== DELETE BANNER ===== */
export const deleteBanner = async (req, res) => {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({
        message: "Not Found"
    });
        
    const imagePath = path.join("uploads", banner.image);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    await banner.deleteOne();
    res.json({
        message: "Banner Deleted"
    });
}