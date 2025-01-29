const ConnectionRequest = require("../models/connection_model");
const User = require("../models/user_model");

const sendConnectionRequest = async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

     if(String(fromUserId) === String(toUserId) ){
        return res.status(400).json({message:"Can't send request to itself"});
     }    
    const toUser=await User.findById(toUserId);
    if(!toUser){
        return res.status(400).json({message:"User not found"})
    }
    
 const existingConnectionRequest=await ConnectionRequest.find({
    $or:[{fromUserId,toUserId},{fromUserId:toUserId,toUserId:fromUserId}]
    });
 if(existingConnectionRequest.length !== 0){
    return res.status(400).json({message:"Connection Request already exists!"})
 }
   const allowedStatus = ["interested", "ignored"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({message:"Invalid Status type: "+ status});
    }

    const connectionRequestData = await ConnectionRequest.create({
      fromUserId,
      toUserId,
      status,
    });
      let message="";
      if(status==="interested"){
        message="Request sent successfully"
      }else{
        message="Request Ignored!"
      }

     
    res
      .status(200)
      .json({message ,connectionRequestData });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const reviewConnectionRequest=async(req,res)=>{
  try {
    const loggedInUserId=req.user.id;
   const {status, requestId}=req.params;
    const allowedStatus=["accepted","rejected"];
   
      if(!allowedStatus.includes(status)){
        throw new Error ({message:"Invalid Status type"})
      }
      
      const connectionRequest=await ConnectionRequest.findOne({
        _id:requestId,
        toUserId:loggedInUserId,
        status:"interested"
      })
     
      if(!connectionRequest){
        throw new Error("Connection Request not found");
      }
      
     
      connectionRequest.status=status;
     const data= await connectionRequest.save();
 
    res.status(200).json({message:`you ${status}  the request`,data})
  } catch (error) {
    res.status(400).json({message:error.message})
  }

}
module.exports = {
  sendConnectionRequest,
  reviewConnectionRequest
};
