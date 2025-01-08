const validator = require('validator')

const validateSignupUser = (req) => {
    const {firstname,lastname,email,password} = req.body
    if(!firstname || !lastname || !email || !password){
        throw new Error("Please fill all required fields")
    }else if(!validator.isEmail(email)){
        throw new Error("Please enter a valid email address")   
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Password must be at least 8 characters long, with at least one uppercase, one lowercase, one number and one special character")
    }
}

module.exports = {validateSignupUser}