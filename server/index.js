import dotenv from "dotenv"
import express from "express";
import cors from "cors"; 
import connectDB from "./db.js";
import User from "./models/user.js";
import bcrypt from "bcrypt"

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

app.post("/signUp",async (req,res)=>{
    const {name,email,mobile,city,country,password}=req.body;

    if(!name){
        return  res.json({
            success:false,
            message:"name is required",
            data:null,
        })
    }
    
        if(!email){
        return  res.json({
            success:false,
            message:"email is required",
            data:null,
        })
    }

        if(!password){
        return  res.json({
            success:false,
            message:"password is required",
            data:null,
        })
    }
    const existingUser=await User.findOne({email:email});

    if(existingUser){
        return res.json({
            success:false,
            message:"user with this email already exists",
            data:null,
        })
    }

    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword  = bcrypt.hashSync(password, salt);

    const newUser=new User({
        name,
        email,
        mobile,
        city,
        country,
        password:encryptedPassword
    })
    try{
        const savedUser=await newUser.save();
        return res.json({
            success:true,
            data:savedUser,
            message:"User register successfully"
        })
    }catch(e){
       return res.json({
            success:false,
            message:`User register failed ${e.message}`,
            data:null 
        })
    }
})

app.post("/login",async (req,res)=>{
    const {email,password}=req.body;

    if(!email){
        return res.json({
            success:false,
            message:"email is required",
            data:null,
        })
    }

            if(!password){
        return  res.json({
            success:false,
            message:"password is required",
            data:null,
        })
    }

     const existingUser=await User.findOne({email });

     if(!existingUser){
        return res.json({
            success:false,
            message:"user doesn`t exist with this email,please sign Up",
            data:null
        })
     }

     const isPasswordCorrect=bcrypt.compareSync(password,existingUser.password);

     existingUser.password=undefined;

     if(isPasswordCorrect){
                return res.json({
            success:true,
            message:"login successfully",
            data:existingUser
        })
     }else{
        return res.json({
            success:false,
            message:"invalid username and password",
            data:null,
        })
     }

})



app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);

    connectDB();
})