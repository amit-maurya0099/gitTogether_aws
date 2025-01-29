const mongoose=require('mongoose');


const connectDB=async(req,res)=>{
      try {
       await mongoose.connect(process.env.MONGO_URL);
      console.log("MongoDB connected Successfully")
      } catch (error) {
        console.log("MongoDb connection failed")
      }
     
}

module.exports={connectDB}