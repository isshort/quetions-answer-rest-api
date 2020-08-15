const express = require("express");
const {
    askQuestion, getAllQuestions, getQuestion, editQuestions, deleteQuestion,
    likeQuestion, UndoLikeQuestion
} = require("../controllers/questions")
const answer = require("./answers")
const Question = require("../models/Questions")
const questionQueryMiddleware = require("../middlewares/query/quetionQueryMiddleware")
const {getAccessToRoute, getQuestionOwnerAccess} = require("../middlewares/authorization/auth")
const {CheckQuestionExist} = require("../middlewares/database/databaseErrorHelpers");
//api/questions
const router = express.Router();

router.get("/:id/like", [getAccessToRoute, CheckQuestionExist], likeQuestion);
router.get("/:id/undo/like", [getAccessToRoute, CheckQuestionExist], UndoLikeQuestion);
router.get("/", questionQueryMiddleware(
    Question,
    {
        population:
            {
                path: "user",
                select: "user profile_img"
            }
    }), getAllQuestions);
router.post("/ask", getAccessToRoute, askQuestion);
router.get("/ask/:id", CheckQuestionExist, getQuestion);
router.put("/:id/edit", [getAccessToRoute, CheckQuestionExist, getQuestionOwnerAccess], editQuestions);
router.delete("/:id/delete", [getAccessToRoute, CheckQuestionExist, getQuestionOwnerAccess], deleteQuestion);
router.use("/:question_id/answer", CheckQuestionExist, answer);

module.exports = router;