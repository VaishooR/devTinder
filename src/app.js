const express = require("express"); //
const app = express(); //


app.use("/about",(req,res)=> res.send("About us page"))
app.use('/contact',(req,res)=>{
    res.send("Contact us page")
})

app.use("/",(req,res)=> res.send("Home page"))

app.listen(7777,()=>{
    console.log("Server is listening on port 7777")
})