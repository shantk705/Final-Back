const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MONGO connected : ${conn.connection.host}`.bgRed.underline.bold);
};

module.exports = connectDB;
