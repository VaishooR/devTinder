const jwt = require('jsonwebtoken');
const User = require("../models/user");


const adminAuth = (req,res,next)=>{
    console.log('Check admin authorization from new file');
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized Admin");
    }else{
        next();
    }
}
const userAuth = async (req,res,next) =>{
    try{
        console.log("checking User authorization from new file")
        const {token} = req.cookies;
        if(!token){
            throw new Error("Invalid token")
        }
        const verifyToken = await jwt.verify(token, 'Vaishoo@1995');
        const {_id} = verifyToken;
        const findUser = await User.findById(_id)
        if(!findUser){
            throw new Error("User not found")
        }
        req.user = findUser
        next();
    }
    catch(err){
        res.status(400).send(err.message)
    }
    
   
       
    
}
module.exports = { adminAuth, userAuth}