const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
    {
     user_id:{type:String,required:true},
     job_id:{type:String,required:true},
    },
    { timestamps: true }
  );










module.exports = mongoose.model("application", ApplicationSchema);