const User = require("../../models/User");
const Question = require("../../models/Questions");
const CustomError = require("../../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const CheckUserExist= asyncErrorWrapper(async (req, res, next) => {
    const {id}=req.params;
    const user=await User.findById(id);
    if(!user){
        return next(new CustomError("There is no such user with that id ",400));
    }
    next();
});

const CheckQuestionExist= asyncErrorWrapper(async (req, res, next) => {
    const {id}=req.params;
    const question=await Question.findById(id);
    if(!question){
        return next(new CustomError("There is no such question with that id ",400))
    }
    next();
})
module.exports={
    CheckUserExist,
    CheckQuestionExist
};