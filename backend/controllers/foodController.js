import foodModel from "../models/foodModel.js";
 
// import file system that is inbuilt in nodejs
import fs from 'fs'

// add food item

const addFood = async(req,res) => {

      // Check if file is present
      console.log(req.file)
      if (!req.file) {
        return res.json({ success: false, message: "No file uploaded" });
      }
 
    // uploaded filename into this variable
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })

    try{
        await food.save();``
        res.json({success:true,message:"food added"})
    }catch(error){
        console.log(error)
        res.json({success:false, message:"Error aa gyi upload krne me"})
    }


};


// all food list
const listFood = async (req,res) =>{

    try {
         // we will store all data of food in this variable
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})

    } catch (error) {

        console.log(error)
        res.json({success:false,message:"error in foodlist controller"})
        
    }

}

// remove food item

const removeFood = async(req,res)=>{
    try {
        
        const food = await foodModel.findById(req.body.id)

        
        // this line will delete the image from folder
        fs.unlink(`uploads/${food.image}`,()=>{})

         // deleting the image from mongodb
         await foodModel.findByIdAndDelete(req.body.id)

         res.json({success:true, message:"food removed"})


    } catch (error) {

        console.log(error)
        res.json({success:false,message:"error in removing"})
        
    }
}
export {addFood,listFood,removeFood}

