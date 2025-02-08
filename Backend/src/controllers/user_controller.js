const { set } = require("mongoose");
const ConnectionRequest=require("../models/connection_model");
const User = require("../models/user_model");
 
const ConnectionUserDataString="firstName lastName skills about avatar githubUrl linkedInUrl"
const getConnections=async(req,res)=>{
    try {
        const loggedInUser=req.user;
        const connections=await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser.id,status:"accepted"},
                 {toUserId:loggedInUser.id,status:"accepted"}]
            
        }).populate("fromUserId",ConnectionUserDataString).populate("toUserId",ConnectionUserDataString);
        const data=connections.map((element)=>{
            if((element.fromUserId._id).toString()===(loggedInUser.id).toString()){
                return element.toUserId;
            }
            return element.fromUserId;
        })
        if(connections.length==0){
            return res.status(404).json({ message: "Connections not found" });
        }
    
        res.status(200).json({data})

        
    } catch (error) {
        res.status(400).json({message:"Could'nt able to get connections"})
    }

}
const getRequests=async(req,res)=>{
    try {
        const loggedInUserId=req.user.id;

        const findRequests=await ConnectionRequest.find({toUserId:loggedInUserId,status:"interested"}).populate('fromUserId',["firstName","lastName"])
    
        if(findRequests.length === 0){
            return res.status(404).json({ message: "Request not found" });
        }

        res.status(200).json(findRequests);
    } catch (error) {
       res.status(400).json({message:error})
    }
}
const getFeedData=async(req,res)=>{

   try {
        const page=parseInt(req.query.page || 1);
        let limit=parseInt(req.query.limit || 5);
       limit= limit>50 ?50 :limit;
        const skip=limit*(page-1)
        

       const loggedInUser=req.user;
       const connectionRequests=await ConnectionRequest.find({
        $or:[{fromUserId:loggedInUser.id}, {toUserId:loggedInUser.id}]
       }).select("fromUserId toUserId")

       const hideFromUserFeed=new Set();
       connectionRequests.forEach((req)=>{
          hideFromUserFeed.add(req.fromUserId.toString())
          hideFromUserFeed.add(req.toUserId.toString())
        }
       )
     

     const users=await User.find({
       $and:[
        { _id:{$nin:Array.from(hideFromUserFeed)}},
        {_id:{$ne:loggedInUser.id}}]
     }).select(ConnectionUserDataString).skip(skip).limit(limit)
       
       res.status(200).json({users})
   } catch (error) {
    res.status(400).json({message:error.message})
   }
}
module.exports={getConnections,getRequests,getFeedData}