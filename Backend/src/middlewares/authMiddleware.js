
const jwt=require('jsonwebtoken');
const User = require('../models/user_model');
const userAuth=async(req,res,next)=>{ 
    try {
        const token=req.cookies.token;
        if(!token){
           return res.status(401).json({message:"Unauthorised Access"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        
        const user = await User.findById(decoded.id);
        req.user=user;
         next();
        
    } catch (error) {
        res.status(404).json({message:"Unauthorised access!"})
    }
       
        
    }
module.exports=userAuth;