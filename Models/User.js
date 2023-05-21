const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    role: {
      type: String,
      enum: ["superAdmin", "user",],
      default: "user",
    },
    pImage: {
      public_id: {
        type: String,
        //required: true,
      },
      url: {
        type: String,
        //required: true,
      },
    },
    bgImage: {
      public_id: {
        type: String,
        //required: true,
      },
      url: {
        type: String,
        //required: true,
      },
    },
    country:{type:String},
    phone:{type:Number},
    position:{type:String},
    about:{type:String}


  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
