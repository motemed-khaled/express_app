import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import {globalError} from "./middlewares/global-error.js";
import { dbConnection } from "./config/database.js";
import { router as userRouter } from "./routes/userRoutes.js";
import { router as catogryRouter } from "./routes/catogryRoutes.js";
import { router as productRouter } from "./routes/productRoutes.js";

dotenv.config();
dbConnection();
const app = express();

// middleware
if (process.env.APP_ENV === "development") {
    app.use(morgan("dev"));
    console.log(`mode : ${process.env.APP_ENV}`)
};
app.use(express.json());

// mount routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/catogry", catogryRouter);
app.use("/api/v1/product", productRouter);

// global express error
app.use(globalError);

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
    console.log(`app run in port : ${PORT}`);
});

//handle error rejction outside express
process.on("unhandledRejection", (err) => {
    console.error(`unhandledRejection : ${err.name} || ${err.message}`);
    server.close(() => {
        console.log("server shutdown.....")
        process.exit(1);
    })
});
