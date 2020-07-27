const Questions = require("../models/Questions");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const askQuestion = asyncErrorWrapper(async (req, res, next) => {
    const information = req.body;
    const question = await Questions.create({
        ...information,  // Here ... we can use all params for example title:information.title and so on
        user: req.user.id
    });
    res
        .status(200)
        .json({
            success: true,
            data: question
        });
});
const getAllQuestions = asyncErrorWrapper(async (req, res, next) => {
    const questions = await Questions.find();
    return res
        .status(200)
        .json({
            sucess: true,
            data: questions
        })
});
const getQuestion = asyncErrorWrapper(async (req, res, next) => {
    const {id} = req.params;
    const question = await Questions.findById(id);
    res
        .status(200)
        .json({
            success: true,
            data: question
        })

});
const editQuestions = asyncErrorWrapper(async (req, res, next) => {
    const {id} = req.params;
    const {title, content} = req.body;
    let question = await Questions.findById(id);

    question.title = title;
    question.content = content;
    question.save();
    return res
        .status(200)
        .json({
            success: true,
            data: question
        })

});
const deleteQuestion = asyncErrorWrapper(async (req, res, next) => {
    const {id} = req.params;

    const question = await Questions.findById(id);
    await question.remove();
    return res
        .status(200)
        .json({
            success: true,
            message: "Questions was deleted"
        })

});
const likeQuestion = asyncErrorWrapper(async (req, res, next) => {
    const {id} = req.params;
    const question = await Questions.findById(id);
    if (question.likes.includes(req.user.id)) {
        return next(new CustomError("You already liked this question", 400));
    }
    question.likes.push(req.user.id);
    await question.save();

    return res
        .status(200)
        .json({
            success: true,
            data: question
        })

});
const UndoLikeQuestion = asyncErrorWrapper(async (req, res, next) => {
    const {id} = req.params;
    const question = await Questions.findById(id);
    if (!question.likes.includes(req.user.id)) {
        return next(new CustomError("You can't undo like operation for this question", 400));
    }
    const index=question.likes.indexOf(question);
    question.likes.splice(index,1)//delete this id for the likes array
    await question.save();
    return res
        .status(200)
        .json({
            success: true,
            data: question
        })

});
module.exports = {
    askQuestion,
    getAllQuestions,
    getQuestion,
    editQuestions,
    deleteQuestion,
    likeQuestion,
    UndoLikeQuestion
};