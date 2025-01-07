const mongoose = require('mongoose');

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
        trim : true
    },
    password : {
        type : String, 
        required : true,       
    },
    age : {
        type : String,
    },
    gender : {
        type : String,
        validate(val){
           if(!["male","female","other"].includes(val)){
            throw new Error ("Invalid gender type")
           }
        }
    },
    photoUrl :{
        type : String,
        default : "https://i.sstatic.net/l60Hf.png"
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
module.exports = mongoose.model('User', userSchema);