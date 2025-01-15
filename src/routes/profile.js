const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require('../middlewares/auth');
const {validateUpdateData} = require('../utils/validation');


profileRouter.get("/profile/view",userAuth,async (req,res)=>{
    try{
        const findUser = req.user
        res.send(findUser)
    }
    catch(err){
        res.status(400).send("ERROR " + err.message)
    }  
})


profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
    try{
        const loggedInUser = req.user;
        const ifValidUpdate = validateUpdateData(req)
        
        if(!ifValidUpdate){
            throw new Error("Invalid update data")
        }
        Object.keys(req.body).forEach((key)=> loggedInUser[key] = req.body[key])
        loggedInUser.save()
        res.send(`${loggedInUser.firstname} your profile was updated successfully`)
    }
    catch(err){
        res.status(400).send("ERROR " + err.message)
    }
})
module.exports = profileRouter;








