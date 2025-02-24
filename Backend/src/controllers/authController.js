
const User = require("../models/user_model");
const {validateSignUpData} = require("../utils/validation");
const validator = require("validator");
const bcrypt = require("bcrypt");
const sendToken = require("../utils/sendToken");
const cloudinary=require('cloudinary');

const register = async (req, res) => {
  const { firstName, lastName, email, password, about, skills,githubUrl,linkedInUrl } = req.body;
  
  let profilePic=req.body.avatar ;
   
  
  try {
    if(!profilePic){
      throw new Error("Avatar is required!");
    }
    validateSignUpData(req);
    const isExist = await User.findOne({ email });
   
    if (isExist) {
      return res.status(400).json({message:"User already exist with this email"})
    }
    if(profilePic){
    const myCloud=await cloudinary.v2.uploader.upload(profilePic);
     avatar={
      public_id:myCloud.public_id,
      url:myCloud.secure_url
    }
  }

  
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      skills,
      about,
      githubUrl,
      linkedInUrl,
       avatar,
    });
    sendToken(user, res, 200, "User Registered Successfully");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const login = async (req, res) => {
  
  const { email, password } = req.body;
  try {
    const validEmail = validator.isEmail(email);
   
    if (!email || !password || !validEmail) {
      throw new Error("Invalid email or password");
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("Email does not exist! Please register!");
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (isPasswordMatched) {
      sendToken(user, res, 200, "Logged In Successfully");
    } else {
      res.status(401).json({message:"Invalid Credentials"});
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const logout = async (req, res) => {
  
 res.cookie("token","", { httpOnly: true, secure: true, expires: new Date(0) }).json({message:"User Logged out successfully"})
};


module.exports = {
  register,
  login,
  logout,

};
