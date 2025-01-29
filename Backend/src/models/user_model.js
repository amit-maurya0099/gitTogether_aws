const mongoose=require("mongoose");
const validator=require('validator');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50

    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        

    },
    password:{
        type:String,
        required:true,
        minLength:8,
        select:false
    },
    skills:{
        type:[String],

    },
    about:{
        type:String,
        default:"This is default description",
        maxLength:100
    },
    photoUrl:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    }


},{timestamps:true})



userSchema.methods.generateToken= async function(){
     return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{expiresIn:'1d'})
}
userSchema.methods.comparePassword=async function (password){
   return await bcrypt.compare(password,this.password);
}

userSchema.index({firstName:1,lastName:1});

const User=mongoose.model("User",userSchema);
module.exports=User;