const express = require("express"); //
const app = express(); //
const {adminAuth, userAuth} = require("./middlewares/auth")


app.use("/admin",adminAuth,userAuth);

app.get("/user",userAuth,(req,res,next)=>res.send("user response"))
app.get("/admin",(req,res,next)=>{
    res.send("Get users data")
})
app.delete("/admin",(req,res,next)=>{
    res.send("Delete an user")
})
app.put("/admin",(req,res,next)=>{
    res.send("Edit an user")
})

app.listen(7777,()=>{
    console.log("Server is listening on port 7777")
})