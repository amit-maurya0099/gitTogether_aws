

const sendToken=async(user,res,statusCode,message)=>{
    try {
        const token=await user.generateToken();
    
    const options={
        httpOnly:true,
        sameSite:"None",
        secure:false,
        expires:new Date(Date.now()+ 24*3600*1000)
    }
    res.status(statusCode).cookie("token",token,options).json({message,user});
        
    } catch (error) {
    res.status(404).json({message:error.message})
    }
    
}
module.exports=sendToken;