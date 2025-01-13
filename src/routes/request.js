const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require('../middlewares/auth');


// To send connection request
requestRouter.post('/sendRequest',userAuth,async(req,res)=>{
    const user = req.user
    res.send(user.firstname + " sent a request")
})

module.exports = requestRouter;