 
import express from 'express'
import { addFood ,listFood, removeFood} from '../controllers/foodController.js'
import multer from 'multer'

const foodRouter = express.Router();


// Initialize Multer with the defined storage
const storage = multer.diskStorage({
    // where we want to store image => in uploads folder
    destination:"uploads", //This specifies that uploaded files should be stored in the uploads directory. This can be a relative or absolute path.
    // cb=>callback
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
    // filename is a function that determines the name of the file that will be stored.
    // It takes three arguments:
    // req: The request object.
    // file: The file object that contains information about the uploaded file.
    // cb: A callback function that should be called once the filename is determined.
    // In the example, the filename is set to the current timestamp followed by the original name of the file. This helps ensure that filenames are unique and prevent overwriting
//The callback function is essential for Multer to understand the destination and filename for each uploaded file.
})


// Initialize Multer with the defined storage
const upload = multer({storage:storage})
foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get('/list',listFood)
foodRouter.post("/remove",removeFood);

export default foodRouter;