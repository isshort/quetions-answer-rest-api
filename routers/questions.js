const express=require("express");
const {askQuestion,getAllQuestions}=require("../controllers/questions")
const {getAccessToRoute}=require("../middlewares/authorization/auth")
//api/questions
const router=express.Router();

router.get("/",getAllQuestions);
router.post("/ask",getAccessToRoute,askQuestion);

 
module.exports=router;