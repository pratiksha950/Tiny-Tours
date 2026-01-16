const checkJWT=(req,res,next)=>{
    const {authorization}=req.headers;
    const token=authorization && authorization.split(" ")[1];
    console.log("Token",token);

    try{
    const decodedToken=jwt.verify(token,process.env.JWT_SECRET);
        console.log(decodedToken);
        req.user=decodedToken;
        next();

    }catch(e){
        return res.json({
            success:false,
            message:"invalid or missing token",
            data:null
        })
    }
}

export {checkJWT,}