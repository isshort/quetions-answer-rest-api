const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const Scheme=mongoose.Schema;

const userSchema=new Scheme({

    name:{
        type:String,
        required:[true,"please Enter your name"]
    },
    email:{
        type: String,
        required:true,
        unique:true,
        match:[
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "please provide a valid email"
        ]
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    },
    password:{
        type:String,
        minlength:[6,"please provide a password with min length 6"],
        required:[true,"Please enter your password"],
        select:false,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    title:{
        type:String
    },
    about:{
        type:String
    },
    place:{
        type:String
    },
    website:{
        type:String
    },
    profile_img:{
        type:String,
        default:"default.jpeg",
    },
    blocked:{
        type:Boolean,
        default:false,
    }

});

//Json Web Token
userSchema.methods.generateJwtFromUser=function(){
    const {JWT_SECRET_KEY,JWT_EXPIRE}=process.env;
    const payload={
        id:this._id,
        name:this.name
    }
    const token = jwt.sign(
        payload, JWT_SECRET_KEY,
        {expiresIn : JWT_EXPIRE});
    return token;
}

// Here we can encrypt the password before saving to database
userSchema.pre("save",function (next) {
    if(!this.isModified("password")){
        next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if(err)next(err);
        // here the this word take all data which came from client with json and we taking the password field here
        bcrypt.hash(this.password, salt, (err, hash)=> {
            if (err) next(err);
            this.password=hash;
            next();
        });
    });
});

module.exports=mongoose.model("User",userSchema);