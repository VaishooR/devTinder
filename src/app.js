const express = require("express"); //
const app = express(); //


app.use("/admin",(req,res,next)=>{
    console.log('Check admin authorization');
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized Admin");
    }else{
        next();
    }
})
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