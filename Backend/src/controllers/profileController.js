const User = require("../models/user_model");
const bcrypt = require("bcrypt");
const sendToken = require("../utils/sendToken");
const cloudinary=require('cloudinary');
const { validateEditProfileData } = require("../utils/validation");

const getProfile = async (req, res) => {
    try {
       const user=req.user;
      
      if (!user) {
       throw new Error({ message: "Unauthorised Access" });
      }
  
     return res.status(200).json({ message: "Retrieval of profile successfull", user });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  const updateProfile = async (req, res) => {
    try {
         
        const loggedInUser=req.user;
      if(!validateEditProfileData(req)){
        return res.status(400).json({message:"Invalid Edit Request"})
      }
      const { id } =req.user;
      const data = req.body;
      let profilePic=req.body.avatar;
      
       let avatar;
      if(profilePic){
       const myCloud=await cloudinary.v2.uploader.upload(profilePic);
      
       avatar={
        public_id:myCloud.public_id,
        url:myCloud.secure_url
       }
               
    }
   

      
      const user=await User.findById(id);
      Object.keys(req.body).forEach((key)=>{
        if(key!=="avatar"){
        user[key]=req.body[key];
      }
      })
      if(avatar){
        user.avatar=avatar;
      }
        
     
      await user.save();
      
     
      res.status(200).json({ message: "Profile updated successfully",user });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };
  const forgotPassword = async (req, res) => {
    try {
      const { id } = req.params;
      
      const { newPassword, confirmPassword } = req.body;
      if(!newPassword || !confirmPassword){
          return res.status(400).json("Please fill all the details");
      }
      
  
      if (newPassword !== confirmPassword) {
       return  res.status(400).json({ message: "Password does'nt match" });
      }
      if(newPassword.length<8 || confirmPassword.length<8){
          return res.status(400).json({message:"Password must be of minimum 8 characters"})
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const user = await User.findByIdAndUpdate(id, { password: hashedPassword });
      if (user) {
        return res.status(200).json({ message: "Password changed successfully" });
      }
        return res.status(404).json({ message: "Password could not changed " });
    } catch (error) {
      res.status(400).json({ message: "Password could'nt update" });
    }
  };

  
module.exports = {   getProfile, updateProfile, forgotPassword};