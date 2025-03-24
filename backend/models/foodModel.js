import mongoose from "mongoose";

const foodShema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true},
 

})

// if model availible then use it otherwise it will create
const foodModel = mongoose.models.food || mongoose.model("food",foodShema); //This line uses the logical OR (||) operator to either assign the existing food model to foodModel or create a new food model if it doesn't already exist.
//mongoose.models is an object that stores all the models that have been created in the current Mongoose instance.
export default foodModel;