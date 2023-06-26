import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "productName is required"],
        minlength: [2, "productName Is shorter"],
        maxlength: [32, "productName is longer"],
        unique: [true, "dublicated productName"],
        trim: true
    },
    slug: {
        type: String,
        lowercase: true
    },
    price: {
        type: Number,
        required: [true, "product price id required"]
    },
    catogry: {
        type: mongoose.Schema.ObjectId,
        ref: "catogry",
        required: [true, "Broduct Must Be Belong To Parent Catogry"]
    }
}, { timestamps: true });

export const productModel = mongoose.model("product", productSchema);