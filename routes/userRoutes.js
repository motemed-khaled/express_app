import express from "express";
import { createUser, loginUser } from "../controller/userController.js";
import { registerValidation , loginValidation } from "../utils/validator/user_validator.js";



export const router = express.Router();

router.route("/register").post(registerValidation,createUser);
router.route("/login").post(loginValidation,loginUser);