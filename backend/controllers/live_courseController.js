import fs from "fs";
import path from "path";
import Live_course from "../models/Live_course.js";


/* ===== CREATE LIVE_COURSE ===== */
export const createLive_course = async (req, res) => {
    try {
        const { title, description, nowPrice, beforePrice, discount } = req.body;

        if (!req.file) {
            return res.status(400).json({
                message: "Image required"
            });
        }

        const live_course = await Live_course.create({
            title, 
            description, 
            nowPrice, 
            beforePrice, 
            discount,
            image: req.file.filename
        });

        res.status(201).json({
            success: true,
            message: "Live-Course Created",
            live_course,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        })
    }
}

/* ===== GET LIVE_COURSE ===== */
export const getLive_course = async (req, res) => {
    try {
        const live_course = await Live_course.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            live_course,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

/* ===== DELETE LIVE_COURSE ===== */
export const deleteLive_course = async (req, res) => {
    const  live_course = await Live_course.findById(req.params.id);
    if (!live_course) {
        return res.status(404).json({
            message: "Not Found"
        });
    }

    const imagePath = path.join("uploads", live_course.image);
    if(fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    await live_course.deleteOne();
    res.json({
        message: "Course Deleted"
    });
}