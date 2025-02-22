const mongoose=require('mongoose');

const messageSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    roomId:{
        type:String,
        required:true,
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    targetUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    text:{
        type:String,
        required:true,
    },
    timestamp:{
        type:Date,
        default:Date.now()
    }

},)


const  Message=mongoose.model("Message",messageSchema);
module.exports=Message;    