import mongoose from "mongoose";

const Live_courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        nowPrice: {
            type: String,
            required: true
        },
        beforePrice: {
            type: String,
            required: true
        },
        discount: {
            type: String,
            required: true
        },
        image: {
            type: String,
            default: null
        },
    }, { timestamps: true }
);

const Live_course = mongoose.model("Live_course", Live_courseSchema);

export default Live_course;