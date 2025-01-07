const express = require("express"); //
const app = express(); //
const connectDB = require('./config/database') //
const User = require("./models/user")



// Middleware which converts data received from the client to json format
app.use(express.json());



// To add new users to db on signup
app.post("/signup", async (req,res)=>{
    console.log(req.body)
    const user = new User(req.body)
    
    try{
        await user.save();
        res.send("User created successfully");
    }
    catch(err){
        res.status(400).send( err.message);
    }
})



// To get all users in the feed
app.get("/feed",async (req,res)=>{
    try{
        const users = await User.find({})
        res.send(users)
        console.log("Found all users in feed")
    }catch(err){
        res.status(400).send("Error in fetching users")
    }
})



// To find a user
app.get("/user",async (req,res)=>{
    const userEmail = req.body.email
    try{ 
        const user =await User.find({email : userEmail})
        if(user.length === 0){
            res.send("No user found")
        }else{
            res.send(user)
        }
        console.log("User found")
    }
    catch(err){
        res.status(400).send("No user found")
    }
})



// To delete a user
app.delete("/user",async (req,res)=>{
    const userId = req.body.id
    console.log(userId)
    try{ 
        const userToDelete = await User.findByIdAndDelete(userId)
        console.log(userToDelete)
        res.send(userToDelete)
        console.log("User deleted successfully")
    }catch(err){
        res.status(400).send("Error deleting user")
    }
})



// To edit a user
app.patch("/user/:id",async (req,res)=>{
    const userId = req.params?.id
    const data = req.body
    try{
        const allowedUpdateFields =[ "firstname","lastname","gender","age","skills","about","photoUrl"]
        const isValidUpdateField = Object.keys(data).every((eachKey)=> allowedUpdateFields.includes(eachKey))
        if(!isValidUpdateField){
            return res.status(400).send("Invalid update field")
        }
        if(data.skills.length > 3){
            throw new Error("Cannot have more than 3 skills")
        }
        const userToEdit = await User.findByIdAndUpdate(userId,data,{runValidators:true})
        res.send(userToEdit)
        console.log("User edited successfully")
    }
    catch(err){
        res.status(400).send("Error editing user")
    }
})


// Connecting to DB first then server starts listening to requests
connectDB().then(()=>{
    console.log("Database connected successfully...");
    app.listen(7777,()=>{
        console.log("Server is listening on port 7777")
    })
}).catch((err)=>{
    console.log("Error connecting to database", err);
})




