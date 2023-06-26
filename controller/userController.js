import asyncHandler from "express-async-handler";
import { userModel } from "../model/user_model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { ApiError } from "../utils/api-error.js";



export const createUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.create({ email: email, password: password });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn:process.env.JWT_EXPIRE_TIME
    })

    res.status(201).json({ data: user , token:token });
});

export const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user || !(await bcryptjs.compare(password, user.password))) {
        return next(new ApiError("Invalid Email Or Password", 401))
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE_TIME
    })

    res.status(200).json({ data: user, token: token });
});


export const auth = asyncHandler((req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new ApiError("not authorized please login first", 401));
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decode) {
        next();
    }
});