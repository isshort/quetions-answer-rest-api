const CustomError = require("../../helpers/error/CustomError");
const customErrorHandler = (err, req, res, next) => {
    let customErr = err;

    if (customErr.name === "SyntaxError") {
        customErr = new CustomError("Syntax Error", 400);
    }
    if (customErr.name === "ValidationError") {
        customErr = new CustomError(customErr.message, 400);
    }
    if (customErr.code === 11000) {
        // Duplicate Error
        customErr = new CustomError("Duplicate Key Error : please check your email address", 400);
    }
    if (customErr.name === "CastError") {
        customErr = new CustomError("Please provide a valid error", 400)
    }
    res.status(customErr.state || 500)
        .json({

            success: false,
            message: customErr.message
        });
};

module.exports = customErrorHandler;
