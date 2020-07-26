const express=require("express");
const {getAllSubscriber}=require("../controllers/subscriber");

const router=express.Router();
router.get("/",getAllSubscriber);

module.exports=router;