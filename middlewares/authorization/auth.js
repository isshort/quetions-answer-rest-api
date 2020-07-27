const CustomError = require("../../helpers/error/CustomError")
const User=require("../../models/User");
const asyncErrorWrapper = require("express-async-handler");
const jwt = require("jsonwebtoken");
const getAccessToRoute = asyncErrorWrapper(async (req, res, next) => {
    const {JWT_SECRET_KEY} = process.env;
    if (!isTokenIncluded(req)) {
        //401 Unauthorizded
        // 403 Forbidden
        return next(
            new CustomError("You are not authorized  access  to this route", 401)
        );

    }

    //get token from header
    const accessToken = getAccessTokenFromHeader(req);
    jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log("Your error is ", err);
            return next(new CustomError("You are not authorized access to this route ", 401));
        }

        req.user = {
            id: decoded.id,
            name: decoded.name
        }
        // console.log(decoded);
        next();
    });
    // console.log(req.headers.authorization);
});
const getAdminAccess=asyncErrorWrapper(async (req, res, next) => {
   const {id}=req.user;
   const user=await User.findById(id);
   if(user.role !== "admin"){
       return next(new CustomError("Only Admin can access to this route",403));
   }
   next();
});
const isTokenIncluded = (req) => {


    return (
        req.headers.authorization && req.headers.authorization.startsWith("Bearer:")

    );
};
const getAccessTokenFromHeader = (req) => {
    const authorization = req.headers.authorization;
    const accessToken = authorization.split(" ")[1];
    return accessToken;


}
const sendJwtToClient = (user, res) => {

    const token = user.generateJwtFromUser();
    const {JWT_COOKIE, NODE_ENV} = process.env;
    return res
        .status(200)
        .cookie("access_token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 10),
            secure: NODE_ENV === "development" ? false : true,
        })
        .json({
            success: true,
            access_token: token,
            data: {
                name: user.name,
                email: user.email
            }
        });


}
module.exports = {
    getAccessToRoute,
    sendJwtToClient,
    isTokenIncluded,
    getAccessTokenFromHeader,
    getAdminAccess
};