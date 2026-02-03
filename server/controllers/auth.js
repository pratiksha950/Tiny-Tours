import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
import {JWT_EXPIRATION} from "../configs.js"

dotenv.config();


//signUp
const postSignUp=async (req,res)=>{
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
}

//Login

const postLogin=async (req,res)=>{
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
     const jwttoken = jwt.sign(
       {
         id: existingUser._id,
         email: existingUser.email,
       },
       process.env.JWT_SECRET,
       {
         expiresIn:JWT_EXPIRATION,
       }
     );
     
            return res.json({
            success:true,
            message:"login successfully",
            token: jwttoken,
            data:existingUser
        })
     }else{
        return res.json({
            success:false,
            message:"invalid username and password",
            data:null,
        })
     }
}

export {postSignUp,postLogin}