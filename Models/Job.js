const mongoose=require("mongoose")

const JobSchema=mongoose.Schema({
    user_id:{ type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true},
        position:{type:String},
        
})