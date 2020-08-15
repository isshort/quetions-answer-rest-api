const searchHelper=(searchKey,query,req)=>{
    //search
    if (req.query.search) {
        const searchObject = {};
        const regex = new RegExp(req.query.search, "i");
        searchObject[searchKey] = regex;
        return  query.where(searchObject);
        // Questions.find().where(searchObject);
    }
    return query;
}
const populateHelper=(query,population)=>{
    return query.populate(population);
}
const questionSortHelper=(query,req)=>{

}
module.exports={
    searchHelper,
    populateHelper,
}