import express from "express";
import {
    createProduct,
    getAllProduct,
    getSpecificProduct,
    updateProduct,
    deleteProduct,
    getProductsMiddleWare,
    createProductMiddleware
} from "../controller/productController.js";
import {
    createProductValidation,
    getSpecificProductValidation,
    deleteProductValidation,
    updateProductValidation
} from "../utils/validator/product_validator.js";
import { auth } from "../controller/userController.js";



export const router = express.Router({mergeParams:true});

router
    .route("/")
    .post(auth,createProductMiddleware, createProductValidation, createProduct)
    .get(getProductsMiddleWare,getAllProduct);

router
    .route("/:id")
    .get(getSpecificProductValidation, getSpecificProduct)
    .put(auth, updateProductValidation, updateProduct)
    .delete(auth , deleteProductValidation , deleteProduct);