const express = require("express");
const {
    askQuestion, getAllQuestions, getQuestion, editQuestions, deleteQuestion,
    likeQuestion
} = require("../controllers/questions")
const {getAccessToRoute, getQuestionOwnerAccess} = require("../middlewares/authorization/auth")
const {CheckQuestionExist} = require("../middlewares/database/databaseErrorHelpers");
//api/questions
const router = express.Router();

router.get("/:id/like", [getAccessToRoute, CheckQuestionExist],likeQuestion);
router.get("/", getAllQuestions);
router.post("/ask", getAccessToRoute, askQuestion);
router.get("/ask/:id", CheckQuestionExist, getQuestion);
router.put("/:id/edit", [getAccessToRoute, CheckQuestionExist, getQuestionOwnerAccess], editQuestions);
router.delete("/:id/delete", [getAccessToRoute, CheckQuestionExist, getQuestionOwnerAccess], deleteQuestion);


module.exports = router;