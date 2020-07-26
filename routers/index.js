const express=require("express");
// Export from other files
const questions=require("./questions");
const auth=require("./auth");
const subscriber=require("./subscriber");

const routers=express.Router();

routers.use("/questions",questions);
routers.use("/auth",auth);
routers.use("/subscriber",subscriber);


module.exports=routers;
