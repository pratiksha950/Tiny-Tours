import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

const checkJWT=(req,res,next)=>{
    const {authorization}=req.headers;
    const token=authorization && authorization.split(" ")[1];
    console.log("Token",token);

    try{
    const decodedToken=jwt.verify(token,process.env.JWT_SECRET);
        console.log(decodedToken);
        req.user=decodedToken;
        console.log(`decodedjwt ${decodedToken}`);
        next();

    }catch(e){
        return res.json({
            success:false,
            message:e.message,
            data:null
        })
    }
}

export {checkJWT,}