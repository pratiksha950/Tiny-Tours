import dotenv from "dotenv"
import express from "express";
import cors from "cors"; 
import connectDB from "./db.js";
import User from "./models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

dotenv.config();

const app=express();
app.use(express.json());
app.use(cors());

const PORT=process.env.PORT || 8080;

const gatekepper=(req,res,next)=>{
     const {name,isSociatyMember}=req.body;
     console.log(`hellow ${name}`);

     if(isSociatyMember){
        next();
     }else{
        return res.json({
            message:"access denied you must be society member"
        })
     } 
}

const areYouDrunk=(req,res,next)=>{
    const {areYouDrunk}=req.body;

    if(areYouDrunk){
        return res.json({message:"entry denied for Drunk"})
    }else{
        next();
    }
}

const ModakSociaty=(req,res)=>{
    console.log("Inside  Modaksociaty");
    const random=Math.round(Math.random()*100);

    return res.json({
        message:"thank you for visiting  Modaksociaty",
        random
    })
}

const ShamSociaty=(req,res)=>{
    console.log("Inside Sham sociaty");
    const random=Math.round(Math.random()*100);

    return res.json({
        message:"thank you for visiting sham sociaty",
        random
    })
}

app.post("/ModakSociaty",gatekepper,areYouDrunk,ModakSociaty);

app.post("/ShamSociaty",gatekepper,ShamSociaty);


app.get("/",(req,res)=>{
    res.json({
        message:"Welcome to server"
    })
}) 

app.get("/Health",(req,res)=>{
    res.json({Status:"OK"})
})

const checkJWT=(req,res,next)=>{
    const {authorization}=req.headers;
    const token=authorization && authorization.split(" ")[1];
    console.log("Token",token);

    try{
    const decodedToken=jwt.verify(token,process.env.JWT_SECRET);
    next();
    }catch(e){
        return res.json({
            success:false,
            message:"invalid or missing token",
            data:null
        })
    }
}


app.get("/apiv1",checkJWT,(req,res)=>{

    return res.json({
        message:"API v1 is working"
    })
})

app.get("/apiv2",(req,res)=>{

    return res.json({
        message:"API v2 is working"
    })
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
     const jwttoken = jwt.sign(
       {
         id: existingUser._id,
         email: existingUser.email,
       },
       process.env.JWT_SECRET,
       {
         expiresIn: "1h",
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

})



app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);

    connectDB();
})