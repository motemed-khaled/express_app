import mongoose from "mongoose";

const catogrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "catogryName Is Required"],
        minlength: [3, "catogryName Is Shorter"],
        maxlength: [32, "catogryName Is longer"],
        unique: [true, "dublicated catogryName"],
        trim: true
    },
    slug: {
        type: String,
        lowercase: true
    }
}, { timestamps: true });

export const catogryModel = mongoose.model("catogry" , catogrySchema)