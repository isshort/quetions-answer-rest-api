const express = require("express");
const {
    addNewAnswerToQuestion,getAllAnswerByQuestion,getSingleAnswer,
    editAnswer,deleteAnswer,likeAnswer,unLikeAnswer
} = require("../controllers/answers")
const {getAccessToRoute,getAnswerOwnerAccess} = require("../middlewares/authorization/auth")
const {CheckQuestionAnswersExist}=require("../middlewares/database/databaseErrorHelpers")
const router = express.Router({mergeParams: true});  // mergeParams we can take the params of parents or above Router

router.post("/", getAccessToRoute, addNewAnswerToQuestion)
router.get("/", getAllAnswerByQuestion)
router.get("/:answer_id",CheckQuestionAnswersExist,getSingleAnswer)
router.get("/:answer_id/like",[CheckQuestionAnswersExist,getAccessToRoute],likeAnswer)
router.get("/:answer_id/undo_like",[CheckQuestionAnswersExist,getAccessToRoute],unLikeAnswer)
router.put("/:answer_id/edit",[CheckQuestionAnswersExist,getAccessToRoute,getAnswerOwnerAccess],editAnswer)
router.delete("/:answer_id/delete",[CheckQuestionAnswersExist,getAccessToRoute,getAnswerOwnerAccess],deleteAnswer)

module.exports = router;