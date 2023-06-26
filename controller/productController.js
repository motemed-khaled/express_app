import asyncHandler from "express-async-handler";
import { ApiError } from "../utils/api-error.js";
import slugify from "slugify";
import { productModel } from "../model/product_model.js";


export const createProductMiddleware = (req, res, next) => {
    if (req.params.catogryId) {
        req.body.catogry = req.params.catogryId
    }
    next();
}

export const createProduct = asyncHandler(async (req, res) => {
    const { name, price, catogry } = req.body;
    const product = await productModel.create({
        name: name,
        slug: slugify(name),
        price: price,
        catogry: catogry
    });

    res.status(201).json({ data: product });
});

export const getProductsMiddleWare = (req, res, next) => {
    let filter = {};
    if (req.params.catogryId) {
        filter = { catogry: req.params.catogryId };
    }
    req.filter = filter;
    next();
}

export const getAllProduct = asyncHandler(async (req, res) => {
    console.log(req.params)
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (page - 1) * limit;
    const product = await productModel.find(req.filter).skip(skip).limit(limit);
    res.status(200).json({ result: product.length, page: page, data: product });
});

export const getSpecificProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) {
        return next(new ApiError(`no product in this id : ${id}`, 404));
    }
    res.status(200).json({ data: product });
});

export const updateProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name, price, catogry } = req.body;
    const product = await productModel.findOneAndUpdate(
        { _id: id },
        { name: name, slug: slugify(name), price: price, catogry: catogry },
        { new: true }
    );

    if (!product) {
        return next(new ApiError(`no product in this id : ${id}`, 404));
    }
    res.status(200).json({ data: product });
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
        return next(new ApiError(`no product in this id : ${id}`, 404));
    }
    res.status(200).json({ data: product });
});