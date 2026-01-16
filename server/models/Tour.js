import {Schema,model} from "mongoose";

const TourSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    cities:{
        type:[String],
        default:[],
    },
    Photos:{
        type:[
            {
                imgURL:String,
                title:String,
                Description:String
            }
        ],
        default:[]
    },
    user:{
        type:Schema.Types.ObjectId, 
        ref:"User",
        required:true
    },
        StartDate:{
        type:Date,
    },
    EndDate:{
    type:Date,
    }

},{timestamps:true})

const Tour=model("Tour",TourSchema);

export default Tour
