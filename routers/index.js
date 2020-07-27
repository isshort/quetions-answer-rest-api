const express=require("express");
// Export from other files
const questions=require("./questions");
const auth=require("./auth");
const subscriber=require("./subscriber");
const users=require("./users");
const admin=require("./admin")
const routers=express.Router();

routers.use("/questions",questions);
routers.use("/auth",auth);
routers.use("/users",users);
routers.use("/subscriber",subscriber);
routers.use("/admin",admin);


module.exports=routers;
