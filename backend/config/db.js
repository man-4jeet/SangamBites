import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
  
export const connectDB = async () => {
    console.log("inside ")
    try{
        await mongoose.connect(process.env.MONGO_URI).then(()=>console.log("DB Connected"));
        console.log("connection is done");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1); // Stop the app if DB connection fails
    }
    
    
   
}

//mongodb#123   password