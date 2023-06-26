import { check } from "express-validator";
import { validationMiddleWare } from "../../middlewares/validationMiddleware.js";



export const createCatogryValidation = [
    check("name").notEmpty().withMessage("catogryName Is Required")
        .isLength({ min: 3 }).withMessage("catogryName Is Shorter")
        .isLength({ max: 32 }).withMessage("catogryName Is Longer"),
    validationMiddleWare
];

export const getSpecificCatogryValidation = [
    check("id").isMongoId().withMessage("invalid catogry id format "),
    validationMiddleWare
];

export const updateCatogryValidation = [
    check("name").notEmpty().withMessage("catogryName Is Required")
        .isLength({ min: 3 }).withMessage("catogryName Is Shorter")
        .isLength({ max: 32 }).withMessage("catogryName Is Longer"),
    check("id").isMongoId().withMessage("invalid catogry id format "),
    validationMiddleWare
];

export const deleteCatogryValidation = [
    check("id").isMongoId().withMessage("invalid catogry id format "),
    validationMiddleWare
];
