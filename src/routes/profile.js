const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require('../middlewares/auth');


profileRouter.get("/profile",userAuth,async (req,res)=>{
    try{
        const findUser = req.user
        res.send(findUser)
    }
    catch(err){
        res.status(400).send("ERROR " + err.message)
    }  
})

module.exports = profileRouter;








