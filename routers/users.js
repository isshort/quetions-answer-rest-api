const express=require("express")
const {getSingleAuth}=require("../controllers/users");
const router=express.Router();
router.get("/:id",getSingleAuth);
module.exports=router;