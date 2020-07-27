const express=require("express")
const {getSingleAuth,getAllUsers}=require("../controllers/users");
const {CheckUserExist}=require("../middlewares/database/databaseErrorHelpers");
const router=express.Router();
router.get("/",getAllUsers);
router.get("/:id",CheckUserExist,getSingleAuth);
module.exports=router;