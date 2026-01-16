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
        Default:[],
    },
    duration:{
        type:Number,
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
        type:Schema>Types>ObjectId,
        ref:"User",
        required:true
    }
})

const User=model("Tour",TourSchema);

export default Tour
