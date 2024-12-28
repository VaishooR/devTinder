const express = require("express"); //
const app = express(); //


app.get("/user",(req,res)=>res.send("Get data"));
app.post("/user",(req,res)=>res.send("Post data"));
app.put("/user",(req,res)=>res.send("Put data"));


app.use("/user",(req,res)=> res.send("App use"));


app.listen(7777,()=>{
    console.log("Server is listening on port 7777")
})