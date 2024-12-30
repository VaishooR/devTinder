const express = require("express"); //
const app = express(); //
const connectDB = require('./config/database') //
const User = require("./models/user")



app.post("/signup", async (req,res)=>{
    const user = new User({
        firstname : "Mommy",
        lastname : "R",
        email : "mom@gmail.com",
        password : "mom",
        age : 50,
        gender : "female"
    })
    
    try{
        await user.save();
    res.send("User created successfully");
    }
    catch(err){
        res.status(400).send("Error saving user");
    }
})



connectDB().then(()=>{
    console.log("Database connected successfully...");
    app.listen(7777,()=>{
        console.log("Server is listening on port 7777")
    })
}).catch((err)=>{
    console.log("Error connecting to database", err);
})




