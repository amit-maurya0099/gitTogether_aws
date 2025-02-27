const socket=require("socket.io");
const crypto=require('crypto');
const Message =require("./models/message_model");

const getSecureRoomId=(userId,targetUserId)=>{
     return crypto.createHash('sha256').update([userId,targetUserId].sort().join("_")).digest("hex")

}

const initializeSocket=(server)=>{
    const io=socket(server,{
      cors: {
        origin: ["http://localhost:5173", "http://51.21.2.211","http://51.21.2.21:3000"],
        methods: ["GET", "POST"],
        credentials: true
      }
      
      });
      console.log(io);
      
      io.on("connection",(socket)=>{
            console.log('user connected ')
        socket.on("joinChat",async({firstName,userId,targetUserId})=>{
          const roomId=getSecureRoomId(userId,targetUserId);
          socket.join(roomId);
          console.log(roomId);
          console.log(firstName + " joined room : " + roomId);
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