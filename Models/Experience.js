const mongoose = require("mongoose");

const ExperienceSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  role: { type: String, required: true },
  company: { type: String, require: true },
  ex_start: { type: Date },
  ex_end: { type: Date },
  description: { type: String },
});
module.exports = mongoose.model("Experience", ExperienceSchema);
