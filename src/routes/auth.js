const express = require('express');
const authRouter = express.Router();
const User = require('../models/user');
const {validateSignupUser} = require('../utils/validation');
const bcrypt = require('bcrypt');

// To add new users to db on signup
authRouter.post("/signup", async (req,res)=>{
    const {firstname, lastname, email} = req.body
    const hashpw = await bcrypt.hash(req.body.password, 10)
    
    try{
        const user = new User({
            firstname,
            lastname,
            email,
            password : hashpw
        })
        validateSignupUser(req)
        await user.save();
        res.send("User created successfully");
    }
    catch(err){
        res.status(400).send( err.message);
    }
})


// To login users
authRouter.post("/login",async (req,res)=>{
    const {email,password} = req.body
    try{
        const user = await User.findOne({email:email})
        if(!user){
            throw new Error("Invalid credentials")
        }
        const checkPassword = await user.verifyPassword(req)
        if(!checkPassword){
            throw new Error("Invalid credentials")
        } else{
            const token = await user.getJWT();
            res.cookie("token",token,{ expires: new Date(Date.now() + 900000)})
            res.send(user)
        }  
    }
    catch(err){
        res.status(400).send(err.message)
    }
})


// To logout users
authRouter.post("/logout",async (req,res)=>{
    res.cookie("token",null,{ expires: new Date(Date.now())})
    res.send("Logout successful")
})


module.exports = authRouter;