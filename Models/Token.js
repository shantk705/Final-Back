const mongoose = require("mongoose");
const tokenSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    token: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Token", tokenSchema);
