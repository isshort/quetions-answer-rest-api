const getAllSubscriber=(req,res,next)=>{
    res
    .status(200)
    .json({
        success:true,
        name:"Namatullah"
    })
};

module.exports={
    getAllSubscriber,
};