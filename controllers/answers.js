const Questions = require("../models/Questions");
const Answer = require("../models/Answer");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const addNewAnswerToQuestion = asyncErrorWrapper(async (req, res, next) => {
    const {question_id}=req.params;
    const user_id=req.user.id;
    const information=req.body;

    const answer=await Answer.create({
        ...information,
        question:question_id,
        user:user_id,
    });
    return res
        .status(200)
        .json({
            success:true,
            data:answer
        })
});
const getAllAnswerByQuestion = asyncErrorWrapper(async (req, res, next) => {
    const {question_id}=req.params;
    const question=await Questions.findById(question_id).populate("answers"); // here wa can all fields of answer
    const answer=question.answers;

    return res
        .status(200)
        .json({
            success:true,
            count:answer.length,
            data:answer
        })
});
const getSingleAnswer = asyncErrorWrapper(async (req, res, next) => {
    const {answer_id}=req.params;
    const {question_id}=req.params
    const answer=await Answer.findById(answer_id)
        .populate({
            path:"user",
            select:"name title"
        })

    return res
        .status(200)
        .json({
            success:true,
            data:answer,
            // data1:question
        })
});
const editAnswer = asyncErrorWrapper(async (req, res, next) => {
    const {answer_id}=req.params;
    const {content}=req.body
    let answer=await Answer.findById(answer_id);
    answer.content=content;
    await answer.save();

    return res
        .status(200)
        .json({
            success:true,
            data:answer,

        })
});
const deleteAnswer = asyncErrorWrapper(async (req, res, next) => {
    const {answer_id}=req.params;
    const {question_id}=req.params;
    await Answer.findByIdAndRemove(answer_id);
    const question=await Questions.findById(question_id);
    question.answers.splice(question.answers.indexOf(answer_id),1);
    await question.save();
    return res
        .status(200)
        .json({
            success:true,
            message:"Answer was successfully deleted"

        })
});
const likeAnswer = asyncErrorWrapper(async (req, res, next) => {
    const {answer_id} = req.params;
    const answer = await Answer.findById(answer_id);
    if (answer.likes.includes(req.user.id)) {
        return next(new CustomError("You already liked this answer", 400));
    }
    answer.likes.push(req.user.id);
    await answer.save();

    return res
        .status(200)
        .json({
            success: true,
            data: answer
        })

});
const unLikeAnswer = asyncErrorWrapper(async (req, res, next) => {

    const {answer_id} = req.params;
    const answer = await Answer.findById(answer_id);
    if (!answer.likes.includes(req.user.id)) {
        return next(new CustomError("You can't undo like operation for this answer", 400));
    }
    const index=answer.likes.indexOf(answer);
    answer.likes.splice(index,1)//delete this id for the likes array
    await answer.save();
    return res
        .status(200)
        .json({
            success: true,
            data: answer
        })

});

module.exports={
    addNewAnswerToQuestion,
    getAllAnswerByQuestion,
    getSingleAnswer,
    editAnswer,
    deleteAnswer,
    likeAnswer,
    unLikeAnswer
}