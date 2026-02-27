import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    offPrice: {
        type :String,
        required: true
    },
    off: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const Blog = mongoose.model("Blog", blogSchema);

export default Blog;