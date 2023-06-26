import asyncHandler from "express-async-handler";
import { ApiError } from "../utils/api-error.js";
import slugify from "slugify";
import { catogryModel } from "../model/catogry_model.js";


export const createCatogry = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const catogry = await catogryModel.create({ name: name, slug: slugify(name) });
    res.status(201).json({ data: catogry });
});

export const getAllCatogry = asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (page - 1) * limit;
    const catogry = await catogryModel.find({}).skip(skip).limit(limit);
    res.status(200).json({ results: catogry.length, page: page, data: catogry });
});

export const getSpecificCatogry = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const catogry = await catogryModel.findById(id);
    if (!catogry) {
        return next(new ApiError(`no catodry in this id : ${id}`, 404));
    }
    res.status(200).json({ data: catogry });
});

export const updateCatogry = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const catogry = await catogryModel.findOneAndUpdate(
        { _id: id },
        { name: name, slug: slugify(name) },
        { new: true }
    );

    if (!catogry) {
        return next(new ApiError(`no catodry in this id : ${id}`, 404));
    }
    res.status(200).json({ data: catogry });
});

export const deleteCatogry = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const catogry = await catogryModel.findByIdAndDelete(id);
    if (!catogry) {
        return next(new ApiError(`no catodry in this id : ${id}`, 404));
    }
    res.status(204).send();
});