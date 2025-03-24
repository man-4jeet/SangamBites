import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true},
    // by default cart will empty 
    cartData:{type:Object, default:{}}
},{minimize:false , timestamps:true})

const userModel = mongoose.models.user || mongoose.model('user',userSchema) 
//This line checks if a model named user already exists. If it does, it uses that model; otherwise, it creates a new one based on the userSchema.
export default userModel;