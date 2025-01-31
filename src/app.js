const express = require("express");
const app = express();
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');

// Middleware which converts data received from the client to json format
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials : true
}));

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);


// Connecting to DB first then server starts listening to requests
connectDB().then(()=>{
    console.log("Database connected successfully...");
    app.listen(7777,()=>{
        console.log("Server is listening on port 7777")
    })
}).catch((err)=>{
    console.log("Error connecting to database", err);
})




