const User = require("../models/User");
const {Error} = require("mongoose");
const customError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const {sendJwtToClient} = require("../middlewares/authorization/auth");
const {validateUserInput,comparePassword}=require("../middlewares/authorization/inputHelpers");
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
    const {email,password}=req.body
    if(!validateUserInput(email,password)){
        return next(new customError("Please fill your email or password ",400));
    }
    const user=await User.findOne({email}).select("+password");
    if(!comparePassword(password,user.password)){
        return next(new customError("Your password or email is not valid",400));
    }
    sendJwtToClient(user,res);
    // res
    // .status(200)
    // .json({
    //     success: true
    // })
});
const logout=asyncErrorWrapper(async (req, res, next) => {

    const {NODE_DEV}=process.env;

    return res
        .status(200)
        .cookie({
            httpOnly:true,
            exipres:new Date(Date.now()),
            secure:NODE_DEV === "development" ? false :true
        })
        .json({
            success:true,
            message:"Logout was successfully"
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
const ImageUpload=asyncErrorWrapper(async (req, res, next) => {
    //Image Uploaded Success
    // here saveProfileImage we can take from ProfileImageUpload.js file filename
    const user=await User.findByIdAndUpdate(req.user.id,{
        "profile_img":req.saveProfileImage
    },{
        new:true,
        runValidators:true
    })
    res
        .status(200)
        .json({
            success:true,
            message:"Image successfully uploaded",
            data:user
        })
});
module.exports = {
    registerUser,
    login,
    logout,
    errTest,
    getUser,
    ImageUpload
};
