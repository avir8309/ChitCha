const express = require('express');
const app = express();
const PORT = 4000;

//New imports
require("dotenv").config();
const http = require('http').Server(app);
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your React app's origin
  credentials: true, // If you're using credentials (like cookies), set this to true
}));
app.use(express.json());
const dbConnect=require("./config/db");
dbConnect();
const Authentication=require("./routes/Authentication");
app.use("/api/v1",Authentication);

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

//Add this before the app.get() block
let users = [];

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('message', (data) => {
    socketIO.emit('messageResponse', data);
  });

  //Listens when a new user joins the server
  socket.on('newUser', (data) => {
    //Adds the new user to the list of users
    users.push(data);
    // console.log(users);
    //Sends the list of users to the client
    socketIO.emit('newUserResponse', users);
    console.log(users);
  });
  socket.on('newRoom',(data)=>{
    socket.join(data.room);
    console.log("request of room received");
    socket.to(data.room).emit('roomMessage', `User ${socket.id} joined room ${data.room}`);
    console.log(data);
  })

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
    // console.log(users);
    //Sends the list of users to the client
    socketIO.emit('newUserResponse', users);
    console.log(users);
    socket.disconnect();
  });
});



http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

