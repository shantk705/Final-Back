const mongoose=require("mongoose")

const JobSchema= new mongoose.Schema({
    user_id:{ type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        },
        position:{type:String},
        company:{type:String},
        location:{type:String},
        description:{type:String},
        requirements:{type:String},
        shift:{type:String},


        
},{timestamps:true})

module.exports = mongoose.model("Job",JobSchema);