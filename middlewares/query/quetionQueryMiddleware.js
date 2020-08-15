const asyncErrorWrapper = require("express-async-handler");
const {searchHelper,populateHelper}=require("./queryMiddlewareHelper")
const questionQueryMiddleware = function (model, option) {
    return asyncErrorWrapper(async (req, res, next) => {
    //initial Query
        let query=model.find();

        //Search
        query=searchHelper("title",query,req);
        if(option && option.population){
            query=populateHelper(query,option.population);
        }

    })
}
module.exports = questionQueryMiddleware
