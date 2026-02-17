import dotenv from "dotenv"
import express from "express";
import cors from "cors"; 
import connectDB from "./db.js";
import ImageKit from "@imagekit/nodejs";


dotenv.config();

//Routes
//health.js
import {getHome,getHealth} from "./controllers/health.js"
//auth/js
import {postSignUp,postLogin} from "./controllers/auth.js"
//tour.js
import {getTours,postTour,putTours,GetTourById} from "./controllers/tours.js"

//Middleware
import {checkJWT} from "./middlewares/jwt.js"

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});
  

const app=express();
app.use(express.json());
app.use(cors());

const PORT=process.env.PORT || 8080;

//health Routes
app.get("/",getHome) 
app.get("/health",getHealth)


app.get('/auth', function (req, res) {
  const { token, expire, signature } = client.helper.getAuthenticationParameters();
  res.send({ token, expire, signature, publicKey: process.env.IMAGEKIT_PUBLIC_KEY });
});




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

//auth Routes
app.post("/signUp",postSignUp);
app.post("/login",postLogin);
app.put("/tours/:id",checkJWT,putTours)
app.get("/tours/:id",checkJWT,GetTourById)

//Tour   Routes
app.post("/tours",checkJWT,getTours)
app.get("/tours",checkJWT,postTour)



app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    connectDB();
})