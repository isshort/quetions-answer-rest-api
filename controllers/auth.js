const User = require("../models/User");
const {Error} = require("mongoose");
const customError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const {sendJwtToClient} = require("../middlewares/authorization/auth");
const {validateUserInput, comparePassword} = require("../middlewares/authorization/inputHelpers");
const sendEmail = require("../helpers/libraries/sendEmail");
const registerUser = asyncErrorWrapper(async (req, res, next) => {
    // async await

    const {name, email, password, role} = req.body
    const user = await User.create({
        name,
        email,
        password,
        role
    })
    sendJwtToClient(user, res);

    // res.status(200)
    //     .json({
    //         success: true,
    //         data: user,
    //     });


});
const login = asyncErrorWrapper(async (req, res, next) => {
    const {email, password} = req.body
    if (!validateUserInput(email, password)) {
        return next(new customError("Please fill your email or password ", 400));
    }
    const user = await User.findOne({email}).select("+password");
    if (!comparePassword(password, user.password)) {
        return next(new customError("Your password or email is not valid", 400));
    }
    sendJwtToClient(user, res);
    // res
    // .status(200)
    // .json({
    //     success: true
    // })
});
const logout = asyncErrorWrapper(async (req, res, next) => {

    const {NODE_DEV} = process.env;

    return res
        .status(200)
        .cookie({
            httpOnly: true,
            exipres: new Date(Date.now()),
            secure: NODE_DEV === "development" ? false : true
        })
        .json({
            success: true,
            message: "Logout was successfully"
        })
});
const errTest = (req, res, next) => {

    // return next(new customError("Custom Error ",400))
    return next(new SyntaxError("SyntaxError "));
    // return next(new TypeError("TypeError "));

}
const getUser = (req, res, next) => {
    res.json({
        success: true,
        data: {
            id: req.user.id,
            name: req.user.name
        }
    })
}
const ImageUpload = asyncErrorWrapper(async (req, res, next) => {
    //Image Uploaded Success
    // here saveProfileImage we can take from ProfileImageUpload.js file filename
    const user = await User.findByIdAndUpdate(req.user.id, {
        "profile_img": req.saveProfileImage
    }, {
        new: true,
        runValidators: true
    })
    res
        .status(200)
        .json({
            success: true,
            message: "Image successfully uploaded",
            data: user
        })
});
const forgotPassword = asyncErrorWrapper(async (req, res, next) => {
    const resetEmail = req.body.email;
    const user = await User.findOne({email: resetEmail});
    if (!user) {
        return next(new customError("There is no user with this email ", 400))
    }
    const resetPasswordToken = user.getResetPasswordTokenFormUser();

    // for saveing the user
    await user.save();

    const resetPasswordUrl = `http://localhost:5000/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`;

    const emailTemplate = `
        <h3>Reset your Password</h3>
        <p>This <a href="${resetPasswordUrl}" target="_blank">link</a> will be expire in 1 hour </p>
    `;
    try {
        await sendEmail({
            from: process.env.SMTP_USER,
            to: resetEmail,
            subject: "Reset your password",
            html: emailTemplate
        })
        return res
            .status(200)
            .json({
                success: true,
                message: "Token sent to your email"
            });
    } catch (e) {
        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;
        await user.save();
        return next(new customError("Email couldn't be sent ",500));

    }

});
module.exports = {
    registerUser,
    login,
    logout,
    errTest,
    getUser,
    ImageUpload,
    forgotPassword
};
