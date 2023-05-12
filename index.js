const express = require("express");
const app = express();
require("dotenv").config();
const colors = require("colors");
console.log(colors);
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
connectDB();

app.listen(port, console.log(`server running on port ${port}`));
