const express = require("express"); //
const app = express(); //

app.use("/user",(req,res,next)=>{
    try{
        throw new Error("One error occured")
    }catch(err){
        res.status(500).send(err.message)
    }
})
app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Error occ")
    }
})

app.listen(7777,()=>{
    console.log("Server is listening on port 7777")
})


