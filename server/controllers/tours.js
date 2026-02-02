import Tour from  "../models/Tour.js"
import dotenv from "dotenv";

dotenv.config();

const getTours=async(req,res)=>{
    const {title,Description,cities,startDate,endDate,Photos}=
    req.body;

    const newTour=new Tour({
        title,
        Description,
        cities,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        Photos,
        user:req.user.id
    })
    try{
        const saveTour=await newTour.save();

        return res.json({
            success:true,
            message:"Tour created successfully",
            data:saveTour
        }
    )
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

const putTours=async(req,res)=>{

    const user=req.user;
    const userId=user.id;
    const {id}=req.params;

    const tour=await Tour.findById(id);

    if(!tour){
        return res.status(404).json({
            success:false,
            message:"Tour not found",
            data:null
        })
    }

    if(tour.user.toString()!==userId){
        return res.json({
            success:false,
            message:`Unautherized to update this tour`,
            data:null
        })
    }

            const {title,Description,cities,startDate,endDate,Photos}=
    req.body;

   await Tour.updateOne(
        {_id:id},
        {title,Description,cities,startDate,endDate,Photos}
    )

     const updatedTour=await Tour.findById(id);
        return res.json({
        success:true,
        message:` tours updated succesfully`,
        data:updatedTour
        })  
}
    
export {getTours,postTour,putTours}