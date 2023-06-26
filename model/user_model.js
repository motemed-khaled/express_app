import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, "dublicated email ..."],
        require: [true, "email is required"],
        trim: true
    },
    password: {
        type: String,
        minlength: [8, "password must be 8 characters "],
        required: [true, "password required"],
        trim:true
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password =await bcryptjs.hash(this.password, 12);
    next();
});

export const userModel = mongoose.model("user", userSchema);