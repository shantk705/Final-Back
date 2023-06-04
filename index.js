const express = require("express");
const app = express();
require("dotenv").config();
const colors = require("colors");
const cors = require("cors")
const bodyparser=require("body-parser")
var multer = require('multer');
var upload = multer();
const helmet = require("helmet");
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const experienceRoutes=require("./Routes/educationRoutes")
const JobRoutes=require("./Routes/jobs")

const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const userRoutes =require("./Routes/userRoutes")
const tokenRoutes =require("./Routes/tokenRoutes")

const io = socketIo(server, {
    cors: {
      origin: "*",
      credentials: true,   //might cause problems
      optionSuccessStatus: 200,
    },
  });
  app.use(
    cors({
      origin: "*",
      credentials: true,   //might cause problems
      optionSuccessStatus: 200,
    })
  );


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
connectDB();
app.use("/user", userRoutes); // route for users
app.use("/token", tokenRoutes); // route for users
app.use("/api/conversations", require("./Routes/conversations"));
app.use("/api/messages", require("./Routes/messages"));
app.use("/Ex", experienceRoutes)
app.use("/jobs",JobRoutes)




//for socket.io
let users = [];

const CreateUser=(userId,socketId)=>{
  users.push({ userId, socketId });
  console.log(users)
}

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => { 
  //when ceonnect
  console.log("a user connected.");
  socket.on("user", (data)=>{
    console.log(data)
    CreateUser(data.id, socket.id);
    io.emit("getUsers", users);
  })

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    console.log("HELLO",senderId)
    console.log("Bye",receiverId)
    const user = getUser(receiverId);
    console.log("zzzz",user)
    if(senderId && receiverId && text && user){
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }

    //in case the user is offline
    else {
      console.log('reciever id not found')
    }
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    console.log(users)
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});


server.listen(port, console.log(`server running on port ${port}`.bgCyan.bold));
