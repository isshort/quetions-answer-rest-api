const Questions = require("../models/Questions");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const askQuestion=asyncErrorWrapper(async (req, res, next) => {
    const information=req.body;
    const question=await Questions.create({
        ...information,  // Here ... we can use all params for example title:information.title and so on
        user:req.user.id
    });
    res
        .status(200)
        .json({
            success:true,
            data:question
        });
});
const getAllQuestions=asyncErrorWrapper(async (req, res, next) => {
    const questions=await Questions.find();
    return res
        .status(200)
        .json({
            sucess:true,
            data:questions
        })
});
module.exports={
    askQuestion,
    getAllQuestions
};