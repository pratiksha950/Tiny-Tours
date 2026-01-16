import Tour from  "../models/Tour.js"
import dotenv from "dotenv";

dotenv.config();

const getTours=async(req,res)=>{
    const {title,Description,cities,StartDate,EndDate,Photos}=
    req.body;

    const newTour=new Tour({
        title,
        Description,
        cities,
        StartDate,
        EndDate,
        Photos,
        user:req.user.id
    })
    try{
        const saveTour=await newTour.save();

        return res.json({
            success:true,
            message:"Tour created successfully",
            data:saveTour
        })
    }catch(e){
        return res.json({
            success:false,
            message:`Tour created failed ${e.message}`,
            data:null
        })
    }
}

const postTour=async(req,res)=>{
    const tours=await Tour.find({user:req.user.id}).populate("user","-password")

            return res.json({
            success:true,
            message:`Fetch tours succesfully`,
            data:tours
        })

}
    
export {getTours,postTour}