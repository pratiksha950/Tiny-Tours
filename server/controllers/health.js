import dotenv from "dotenv";

dotenv.config();

const getHome=(req,res)=>{
    res.json({
        message:"Welcome to server"
    })
}

const getHealth=(req,res)=>{
    res.json({Status:"OK"})
}

export {getHome,getHealth}