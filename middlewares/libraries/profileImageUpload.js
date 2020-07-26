const multer=require("multer");
const path=require("path");
const CustomError=require("../../helpers/error/CustomError");

//Storage ,FileFilter

const storage=multer.diskStorage({
    destination:function (req,file,cb) {
        const rootDir=path.dirname(require.main.filename);
        cb(null,path.join(rootDir,"/public/upload"))
    },
    filename:function (req,file,cb) {
        //File - Mimetype image/jepg
        const extension=file.mimetype.split("/")[1];
        req.saveProfileImage="image_"+req.user.id+"."+extension;
        cb(null,req.saveProfileImage);
    }

});
const fileFilter=(req,file,cb)=>{
    let allowedMimeTypes=["image/jpg","image/jpeg","image/gif","image/png"];
    if(!allowedMimeTypes.includes(file.mimetype)){
        return cb(new CustomError("Please provide a valid image ",400),false);
    }
    return cb(null,true);
}
const profileImageUpload=multer({storage,fileFilter});

module.exports=profileImageUpload