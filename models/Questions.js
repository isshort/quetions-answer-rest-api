const mongose=require("mongoose");
const slugify=require("slugify");
const Schema=mongose.Schema
const QuestionSchema=new Schema({
    title:{
        type:String,
        required:[true,"Please provide a title"],
        minLength:[10,"Please provide a title least 10 character"],
        unique:true
    },
    content:{
        type: String,
        required: [true,"Please provide a content"],
        minLength: [10,"Please provide a content lease 10 character"]
    },
    slug:String,
    createdAt:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongose.Schema.ObjectId,
        required:true,
        ref:"User"  //Here we can connect Question database to User
    },
    likes:[
        {
            type:mongose.Schema.ObjectId,
            ref:"User"
        }
    ]

})

QuestionSchema.pre("save",function (next) {
    if(!this.isModified("title")){
        next();
    }
    this.slug=this.makeSlug();
    next();
})
QuestionSchema.methods.makeSlug=function(){
    return slugify(this.title, {
        replacement: '-',  // replace spaces with replacement character, defaults to `-`
        remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
        lower: true,      // convert to lower case, defaults to `false`
    });
};
module.exports=mongose.model("Questions",QuestionSchema)