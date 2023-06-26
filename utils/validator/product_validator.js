import { check } from "express-validator";
import { validationMiddleWare } from "../../middlewares/validationMiddleware.js";
import { auth } from "../../controller/userController.js";



export const createProductValidation = [
    check("name").notEmpty().withMessage("productName is required")
        .isLength({ min: 2 }).withMessage("productName is shorter")
        .isLength({ max: 32 }).withMessage("productName is longer"),
    check("price").notEmpty().withMessage("productPrice is required"),
    check("catogry").isMongoId().withMessage("invalid productId Format "),
    validationMiddleWare
];

export const getSpecificProductValidation = [
    check("id").isMongoId().withMessage("invalid product id format "),
    validationMiddleWare
];

export const updateProductValidation = [
    check("name").notEmpty().withMessage("productName is required")
        .isLength({ min: 2 }).withMessage("productName is shorter")
        .isLength({ max: 32 }).withMessage("productName is longer"),
    check("price").notEmpty().withMessage("productPrice is required"),
    check("catogry").isMongoId().withMessage("invalid productId Format "),
    check("id").isMongoId().withMessage("invalid product id format "),
    validationMiddleWare
];

export const deleteProductValidation = [
    check("id").isMongoId().withMessage("invalid product id format "),
    validationMiddleWare
]


