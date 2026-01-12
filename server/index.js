import dotenv from "dotenv"
import express from "express";
import cors from "cors"; 
import connectDB from "./db.js";

dotenv.config();

const app=express();
app.use(express.json());
app.use(cors());



const PORT=process.env.PORT || 8080;



app.get("/",(req,res)=>{
    res.json({
        message:"Welcome to server"
    })
}) 

app.get("/Health",(req,res)=>{
    res.json({Status:"OK"})
})


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);

    connectDB();
})