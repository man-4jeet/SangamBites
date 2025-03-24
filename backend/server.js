import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import "dotenv/config"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
// app config
//Creates an instance of an Express application.
const app = express()
// Sets the port on which the server will run.
const port = 4000

// middleware => request is parsed  express.json(): Parses incoming JSON requests and makes the data available on req.body.
app.use(express.json())
// using this we can access backend from frontend
app.use(cors())

// Calls the function to establish a connection to the database.
connectDB();

// api endpoints
app.use("/api/food",foodRouter)
app.use("/image",express.static('uploads'))
//express.static is middleware that serves static files from a specified director
//Static files are files served directly to the client without any modification by the server
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req, res)=>{

    res.send("<h1>API WORKING SUCCESSFULLY :) </h1>")
})

// running the express server
app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})
