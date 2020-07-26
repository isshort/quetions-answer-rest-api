const bcrypt=require("bcryptjs");
const validateUserInput=(eamil,password)=>{
    return eamil && password;
}
const comparePassword=(password,hashPassword)=>{
    return bcrypt.compareSync(password,hashPassword);
}
module.exports={
    validateUserInput: validateUserInput,
    comparePassword,
};