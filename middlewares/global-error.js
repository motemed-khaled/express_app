import { ApiError } from "../utils/api-error.js";

const invalidSignatureError = () => new ApiError("Invalid Token , please login again", 401);

const TokenExpiredError = () => new ApiError("Expired Token , please login again", 401);


const sendErrorForDevelopment = (res , err) => {
    return res.status(err.statusCode).json({
        status: err.status,
        error : err,
        message: err.message,
        stack: err.stack
    });
}

const sendErrorForProduction = (res , err) => {
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
}


export const globalError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error"
    if (process.env.APP_ENV === "development") {
        sendErrorForDevelopment(res, err);
    } else {
        if (err.name === "JsonWebTokenError") err = invalidSignatureError();
        if (err.name === "TokenExpiredError") err = TokenExpiredError();
        sendErrorForProduction(res, err);
    }
}

