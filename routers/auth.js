const express=require("express");
const { registerUser,login,logout,errTest ,getUser,ImageUpload} = require("../controllers/auth");
const {getAccessToRoute}=require("../middlewares/authorization/auth");
const profileImageUpload=require("../middlewares/libraries/profileImageUpload");
//api/auth
const router=express.Router();
router.post("/",registerUser);
router.post("/login",login);
router.get("/logout",getAccessToRoute,logout);
router.get("/error",errTest);
router.get("/profile",getAccessToRoute,getUser);
router.post("/upload",[getAccessToRoute,profileImageUpload.single("profile_image")],ImageUpload);

 
module.exports=router;
