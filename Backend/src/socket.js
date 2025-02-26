const socket=require("socket.io");
const crypto=require('crypto');
const Message =require("./models/message_model");

const getSecureRoomId=(userId,targetUserId)=>{
     return crypto.createHash('sha256').update([userId,targetUserId].sort().join("_")).digest("hex")

}

const initializeSocket=(server)=>{
    const io=socket(server,{
        cors:{
          origin:["http://localhost:5173","https://gittogether.vercel.app","http://51.21.2.211"]
        }
      
      });
      
      io.on("connection",(socket)=>{

        socket.on("joinChat",async({firstName,userId,targetUserId})=>{
          const roomId=getSecureRoomId(userId,targetUserId);
          socket.join(roomId);
          // console.log(firstName + " joined room : " + roomId);
          const messages = await Message.find({ roomId }).sort({ timestamp: 1 });
           socket.emit('prevMessages',messages);
           
        })
        socket.on("sendMessage",async({name,senderId,targetUserId,text,timestamp})=>{
          
          const roomId=getSecureRoomId(senderId,targetUserId);
          socket.join(roomId);
          const newMessage=new Message({name,roomId, senderId, targetUserId, text,timestamp});
          await newMessage.save();
          io.to(roomId).emit("messageReceived",{name,text,senderId,timestamp});
        })
        socket.on("disconnect",()=>{
          // console.log(`User ${socket.id} disconnected`);
        })
      
      })

}


module.exports=initializeSocket;