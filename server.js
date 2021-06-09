const express =require("express");
const dotenv=require("dotenv");
const connectDatabase = require("./helpers/database/connectDatabase");
const customErrorHandler=require("./middlewares/errors/customErrorHandler");
const routers=require("./routers");// here for default it will be link to index.js in routers directory


// Enviroments
dotenv.config({
    path:"./config/env/config.env"
});

// Mongo DB
connectDatabase();



const app =express();

// Express Body Middleware when you post data with json
app.use(express.json());


const PORT= process.env.PORT | 3000;
console.log("your pori si ",PORT)
// Routers Middleware we can use
// and create the url for question and auth
app.use("/api",routers);

// Static files
const path=require("path");
app.use(express.static(path.join(__dirname,"public")))

// Error Handling
app.use( customErrorHandler);

app.listen(PORT,()=>{
    console.log("App Started on ",PORT," status ",process.env.NODE_ENV);
})
