const express=require("express")
const {getAccessToRoute,getAdminAccess}=require("../middlewares/authorization/auth")
const {CheckUserExist}=require("../middlewares/database/databaseErrorHelpers")
const {blockUser,deleteUser}=require("../controllers/admin")
//Blokc User
//Delete User
const router=express.Router();
//if you want to use getAccessToRoute And  Admin access for all routes we can write
router.use([getAccessToRoute,getAdminAccess])


router.get("/block/:id",CheckUserExist,blockUser)
router.get("/delete/:id",CheckUserExist,deleteUser)

module.exports=router;
