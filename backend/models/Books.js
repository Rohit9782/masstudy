import mongoose from "mongoose";

const BooksSchema = new mongoose.Schema(
    {
        title: { 
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        amazonUrl: {
            type: String,
            required: true
        },
        image: {
            type: String,
            default: null
        },
    },{ timestamps: true }
);

const Books = mongoose.model("Books", BooksSchema);

export default Books;