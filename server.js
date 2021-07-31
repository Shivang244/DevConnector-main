const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const http = require("http");
const cors=require('cors');
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const botName = "Admin";
const formatMessage = require("./utils/messages");




const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");

app.use(cors());
app.use(express.static(path.join(__dirname, "client/src/components/Chat")));

// Connect Database

connectDB();

// Init middleware
app.use(express.json({ extended: false }));

// app.get("/", (req, res) => {
//     res.send("API running!");
// });

app.get("/",(req,res)=>{
  console.log("server is up and running")
})

app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/collab", require("./routes/api/collab"));
//Serve static assets in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// * Run when client connects
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    console.log(room)
    const user = userJoin(socket.id, username, room);
    console.log("user has joined")
    socket.join(user.room);

    //Welcome current user
    socket.emit("message", formatMessage(botName, "Welcome to ChatCord")); // ie. socket.emit(<message-name> , <messsage-value>)
    //emit() -> show only to the connecting user

    //  Broadcast when a user connects
    socket.broadcast.to(user.room).emit(
        //.to(user.room) - broadcast to specific room
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)
    ); //broadcast.emit() -> to everyone except connecting client

    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit("message", formatMessage(user.username, msg)); // ! caught by main.js' socket.on("message") ie. from server to client which can then be outputted on client side using DOM manipulation
  });

  // * Runs when client disconnects (within the io.on(connection) )
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
          "message",
          formatMessage(botName, `${user.username} has left the chat`)
      ); // io.emit() - emit to EVERYONE
      // Send users and room info
      io.to(user.room).emit("roomusers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});



const port = process.env.PORT || "5000";

server.listen(port, () => console.log(`Server started on port ${port}`));
