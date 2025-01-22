const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require('../middlewares/auth');
const connectionRequest = require('../models/connectionRequest');
const User = require("../models/user");


// To send connection request
requestRouter.post('/request/send/:status/:toUserId',userAuth,async(req,res)=>{
    try{
        const user = req.user;
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        // // check if request is sent to logged in user
        // if(fromUserId.toString() === toUserId.toString()){
        //     throw new Error("You cannot send request to yourself")
        // }

        // check if status is valid
        const allowedStatus = ["ignored","interested"]
        if(!allowedStatus.includes(status)){
            throw new Error("Invalid status")
        }

        // check if toUserId exists
        const toUserIdExists =await User.findById(toUserId)
        if(!toUserIdExists){
            throw new Error("User not found")
        }

       

        // check if request already exists
        const existingRequest = await connectionRequest.findOne({ 
            $or : [
                {fromUserId : fromUserId, toUserId : toUserId},
                {fromUserId : toUserId, toUserId : fromUserId}
            ]
        })
        if(existingRequest){
            throw new Error("Request already exists")
        }


        // send request
        const sendRequest = new connectionRequest({
            fromUserId,
            toUserId,
            status
        })
        await sendRequest.save();

        const toUser = await User.findById(toUserId)
        if(status === "interested"){
            res.send(user.firstname + " sent a request to " + toUser.firstname)}
        else{
            res.send(user.firstname + " ignored " + toUser.firstname + "'s request")
        }
    }
    catch(err){
        res.status(400).send("ERROR " + err.message)
    }
})

module.exports = requestRouter;