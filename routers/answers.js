const express = require("express");
const {addNewAnswerToQuestion} = require("../controllers/answers")
const {getAccessToRoute} = require("../middlewares/authorization/auth")
const router = express.Router({mergeParams: true});  // mergeParams we can take the params of parents or above Router

router.post("/", getAccessToRoute, addNewAnswerToQuestion)

module.exports = router;