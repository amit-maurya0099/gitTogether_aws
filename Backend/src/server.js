const express = require("express");
const { connectDB } = require("./config.js/db");
const userRoutes = require("./routers/userRoutes");
const profileRoutes = require("./routers/profileRoutes");
const authRoutes = require("./routers/authRoutes");
const connectionRequestRoutes = require("./routers/connectionRequestRoutes");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");
const app = express();
const cloudinary = require("cloudinary");
const cors = require("cors");
const http = require("http");
const initializeSocket = require("./socket");

require("dotenv").config();

app.use(cookieParser());
app.use(express.json());
app.set("trust proxy", 1);

app.use(
  cors({
    origin: ["http://localhost:5173", "http://15.206.194.35"],
    credentials: true,
  })
);
app.use(fileupload());
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/user", userRoutes);
app.use("/connection", connectionRequestRoutes);

const server = http.createServer(app);
initializeSocket(server);

connectDB()
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connnection unsuccessfull");
  });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
