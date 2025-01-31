const express=require('express');
const { connectDB } = require('./config.js/db');
const userRoutes= require("./routers/userRoutes");
const profileRoutes= require("./routers/profileRoutes");
const authRoutes= require("./routers/authRoutes");
const connectionRequestRoutes= require("./routers/connectionRequestRoutes");
const cookieParser = require('cookie-parser');
const fileupload=require('express-fileupload');
const app=express();
const cloudinary=require('cloudinary')

require('dotenv').config()

app.use(cookieParser())
app.use(express.json());
app.use(fileupload());
app.use("/api/auth",authRoutes)
app.use("/api/profile",profileRoutes)
app.use("/api/user",userRoutes);
app.use("/api/connection",connectionRequestRoutes);





connectDB().then(()=>{
    app.listen(3000,()=>{
        console.log("Server is running on port 3000")
    })
}).catch((err)=>{
    console.error("Database connnection unsuccessfull");
})

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})