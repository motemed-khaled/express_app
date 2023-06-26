import express from "express";
import { auth } from "../controller/userController.js";
import {
    createCatogry,
    getAllCatogry,
    getSpecificCatogry,
    updateCatogry,
    deleteCatogry
} from "../controller/catogryController.js";
import {
    createCatogryValidation,
    getSpecificCatogryValidation,
    updateCatogryValidation,
    deleteCatogryValidation
} from "../utils/validator/catogry_validatr.js";
import { router as productRoutes } from "./productRoutes.js";



export const router = express.Router();

router.use("/:catogryId/product", productRoutes);
 
router
    .route("/")
    .post(auth,createCatogryValidation, createCatogry)
    .get(getAllCatogry);

router
    .route("/:id")
    .get(getSpecificCatogryValidation, getSpecificCatogry)
    .put(auth, updateCatogryValidation, updateCatogry)
    .delete(auth,deleteCatogryValidation,deleteCatogry);
