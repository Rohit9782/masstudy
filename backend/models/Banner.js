import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        price: Number,
        image: String,
    },
    { timestamps: true }
);

export default mongoose.model("Banner", bannerSchema);