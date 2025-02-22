const socket=require("socket.io");
const crypto=require('crypto');

const getSecureRoomId=(userId,targetUserId)=>{
     return crypto.createHash('sha256').update([userId,targetUserId].sort().join("_")).digest("hex")

}

const initializeSocket=(server)=>{
    const io=socket(server,{
        cors:{
          origin:"http://localhost:5173"
        }
      
      });
      
      io.on("connection",(socket)=>{

        socket.on("joinChat",({firstName,userId,targetUserId})=>{
          const roomId=getSecureRoomId(userId,targetUserId);
          socket.join(roomId);
          console.log(firstName + " joined room : " + roomId);


        })
        socket.on("sendMessage",({name,senderId,targetUserId,text})=>{
          const roomId=getSecureRoomId(senderId,targetUserId);
          socket.join(roomId);
          io.to(roomId).emit("messageReceived",{name,text,senderId});
        })
        socket.on("disconnect",()=>{
          console.log(`User ${socket.id} disconnected`);
        })
      
      })

}


module.exports=initializeSocket;