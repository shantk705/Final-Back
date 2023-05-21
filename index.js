const express = require("express");
const app = express();
require("dotenv").config();
const colors = require("colors");
const cors = require("cors")
const bodyparser=require("body-parser")
var multer = require('multer');
var upload = multer();

const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const userRoutes =require("./Routes/userRoutes")
const tokenRoutes =require("./Routes/tokenRoutes")



app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
connectDB();
app.use("/user", userRoutes); // route for users
app.use("/token", tokenRoutes); // route for users

app.listen(port, console.log(`server running on port ${port}`.bgCyan.bold));
