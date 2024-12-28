const express = require("express"); //
const app = express(); //


app.get("/user",(req,res,next)=>{
    console.log('rh1')
    next()
    // res.send("res rh1")
    
})
app.get("/user",(req,res,next)=>{
    console.log('rh2')
    // res.send("res rh2")
    next()
})
app.get("/user",(req,res,next)=>{
    console.log('rh3')
    // res.send("res rh3")
    next()
})
app.get("/user",(req,res,next)=>{
    console.log('rh4')
    res.send("res rh4")
    // next()
})


app.listen(7777,()=>{
    console.log("Server is listening on port 7777")
})