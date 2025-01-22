const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    firstname : {
        type: String,
        required : [true,"first name is required"],
        minLength : 4,
        maxLength : 50
    },
    lastname : {
        type : String,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error("Please enter a valid email")
            }
        }
    },
    password : {
        type : String, 
        required : true,  
        validate(val){
            if(!validator.isStrongPassword(val)){
                throw new Error("Password is not strong enough")
            }
        }     
    },
    age : {
        type : String,
    },
    gender : {
        type : String,
        enum : {
            values : ["male","female","other"],
            message : `{VALUE} is not a valid gender`
        },
        // validate(val){
        //    if(!["male","female","other"].includes(val)){
        //     throw new Error ("Invalid gender type")
        //    }
        // }
    },
    photoUrl :{
        type : String,
        default : "https://i.sstatic.net/l60Hf.png",
        validate(val){
            if(!validator.isURL(val)){
                throw new Error("Please enter a valid url")
            }
        }
    },
    skills : {
        type : [String]
    },
    about : {
        type : String,
        default : "This is default about"
    }
},{
    timestamps: true
}
)

userSchema.methods.getJWT = async function() {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, 'Vaishoo@1995', { expiresIn: '1d' });
    return token
}
userSchema.methods.verifyPassword = async function (req){
    const {password} = req.body
    const user = this;
    const checkPassword = await bcrypt.compare(password,user.password)
    return checkPassword;
}
module.exports = mongoose.model('User', userSchema);