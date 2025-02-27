const socketIo = require("socket.io");
const crypto = require("crypto");
const Message = require("./models/message_model");

const getSecureRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("_"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "*", // Allow all origins for testing (Restrict this in production)
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"], // Ensures proper connection
  });

  console.log("✅ WebSocket Server Initialized");

  io.on("connection", (socket) => {
    console.log(`🔹 User Connected: ${socket.id}`);

    socket.on("joinChat", async ({ firstName, userId, targetUserId }) => {
      const roomId = getSecureRoomId(userId, targetUserId);
      socket.join(roomId);
      console.log(`🔹 ${firstName} joined room: ${roomId}`);

      try {
        const messages = await Message.find({ roomId }).sort({ timestamp: 1 });
        socket.emit("prevMessages", messages);
      } catch (error) {
        console.error("❌ Error fetching messages:", error);
      }
    });

    socket.on("sendMessage", async ({ name, senderId, targetUserId, text, timestamp }) => {
      const roomId = getSecureRoomId(senderId, targetUserId);
      socket.join(roomId);

      try {
        const newMessage = new Message({ name, roomId, senderId, targetUserId, text, timestamp });
        await newMessage.save();
        io.to(roomId).emit("messageReceived", { name, text, senderId, timestamp });
      } catch (error) {
        console.error("❌ Error saving message:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log(`❌ User Disconnected: ${socket.id}`);
    });
  });

  return io;
};

module.exports = initializeSocket;
