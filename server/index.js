import dotenv from "dotenv"
import express from "express";
import cors from "cors"; 
import connectDB from "./db.js";


dotenv.config();

//Routes
//health.js
import {getHome,getHealth} from "./controllers/health.js"
//auth/js
import {postSignUp,postLogin} from "./controllers/auth.js"
//tour.js
import {getTours,postTour} from "./controllers/tours.js"

//Middleware
import {checkJWT} from "./middlewares/jwt.js"

const app=express();
app.use(express.json());
app.use(cors());

const PORT=process.env.PORT || 8080;

// const gatekepper=(req,res,next)=>{
//      const {name,isSociatyMember}=req.body;
//      console.log(`hellow ${name}`);

//      if(isSociatyMember){
//         next();
//      }else{
//         return res.json({
//             message:"access denied you must be society member"
//         })
//      } 
// }

// const areYouDrunk=(req,res,next)=>{
//     const {areYouDrunk}=req.body;

//     if(areYouDrunk){
//         return res.json({message:"entry denied for Drunk"})
//     }else{
//         next();
//     }
// }

// const ModakSociaty=(req,res)=>{
//     console.log("Inside  Modaksociaty");
//     const random=Math.round(Math.random()*100);

//     return res.json({
//         message:"thank you for visiting  Modaksociaty",
//         random
//     })
// }

// const ShamSociaty=(req,res)=>{
//     console.log("Inside Sham sociaty");
//     const random=Math.round(Math.random()*100);

//     return res.json({
//         message:"thank you for visiting sham sociaty",
//         random
//     })
// }

// app.post("/ModakSociaty",gatekepper,areYouDrunk,ModakSociaty);

// app.post("/ShamSociaty",gatekepper,ShamSociaty);


app.get("/",getHome) 

app.get("/Health",getHealth)



// app.get("/apiv1",checkJWT,(req,res)=>{

//     return res.json({
//         message:"API v1 is working"
//     })
// })

// app.get("/apiv2",(req,res)=>{

//     return res.json({
//         message:"API v2 is working"
//     })
// })


app.post("/signUp",postSignUp);

app.post("/login",postLogin)

app.post("/tours",checkJWT,getTours)

app.get("/tours",checkJWT,postTour)



app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    connectDB();
})