const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  degree: { type: String, required: true },
  school: { type: String, require: true },
  startDate: { type: Date },
  endDate: { type: Date },
  
},{timestamp:true});
module.exports = mongoose.model("Education", EducationSchema);
