const express=require("express");
const {getAllquestions}=require("../controllers/question")

//api/questions
const router=express.Router();

router.get("/",getAllquestions);

 
module.exports=router;