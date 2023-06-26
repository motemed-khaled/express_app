import { check } from "express-validator";
import { validationMiddleWare } from "../../middlewares/validationMiddleware.js";
import { ApiError } from "../api-error.js";


export const registerValidation = [
    check("email").isEmail().withMessage("Invalid Email.."),
    check("password")
        .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1
        })
        .withMessage("password: must be 8 characters with at least 1 capital and 1 small and 1 special character")
        .custom((password, { req }) => {
        if (password != req.body.confirmBassword) {
            throw new ApiError("confirmBassword Incorrect");
            }
            return true;
    }),
    check("confirmBassword").notEmpty().withMessage("confirm password required"),
    validationMiddleWare
];

export const loginValidation = [
    check("email").isEmail().withMessage("Invalid Email.."),
    check("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1
    }).withMessage("invalid password"),
    validationMiddleWare
];