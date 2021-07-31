import React, { Component } from 'react';
import "./chat.css"

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: {},
            roomNames: [],
            userList: [],

        } 
    }


    



    render() {
        return (
            <>
            <h1 className="large text-primary">Chat</h1> 
            
             <div class="chat-container">
                
                <main class="chat-main">
                    <div class="chat-sidebar">
                    <h3><i class="fas fa-comments"></i> Room Name:</h3>
                    <h2 id="room-name">Waz</h2>
                    <h2 id="room-name">Waz</h2>
                    <h2 id="room-name">Waz</h2>
                    <h2 id="room-name">Waz</h2>
                    <h2 id="room-name">Waz</h2>
                    <h2 id="room-name">Waz</h2>
                    <h2 id="room-name">Waz</h2>
                    </div>
                    <div class="chatz">

                        <div class="chat-messages">
                            
                        </div>


                        <div class="chat-form-container">
                            <form id="chat-form">
                            <input
                                id="msg"
                                type="text"
                                placeholder="Enter Message"
                                required
                                autocomplete="off"
                            />
                            <button class="btn btn-dark my-1" style={{color:"#ffffff",margin:"0", borderRadius:"0px"}}><i class="fas fa-paper-plane"></i> Send</button>
                            </form>
                        </div>
                    </div>
                </main>
                
                </div>   
            </>
        );
    }
}

export default Chat;




// //Client side JS

// const chatForm = document.getElementById("chat-form"); //event listener for submission of the chat form in chat.html to show the sent messages in chat window
// const chatMessages = document.querySelector(".chat-messages");
// const roomName = document.getElementById("room-name");
// const userList = document.getElementById("users");

// const socket = io();

// // TODO Get Username and Room from URL using QS CDN <add script tag in index.html>
// const { username, room } = Qs.parse(location.search, {
//   ignoreQueryPrefix: true,
// });
// console.log(username, room);

// // TODO Join Chatroom
// socket.emit("joinRoom", { username, room });

// // TODO Get room and users
// socket.on("roomUsers", ({ room, users }) => {
//   outputRoomName(room);
//   console.log(room);
//   outputUsers(users);
// });

// // TODO 1. message received from Server
// socket.on("message", (message) => {
//   //Catch the emit-ted message from socket in server.js
//   console.log(message);
//   /* 
//     * message is to be outputted to client message history
//     ? use React or in this case vanilla javascript 
//   */
//     outputMessage(message); // defined below
//     //Scroll down
//     chatMessages.scrollTop = chatMessages.scrollHeight;
//   });
  
//   // TODO 2. Message submit from Client to Server
//   chatForm.addEventListener("submit", (e) => {
//     e.preventDefault(); //stop the submit from submitting it to a file and catch e to console.log
  
//     // Get message text
//     const msg = e.target.elements.msg.value;
  
//     //console.log(msg);
  
//     // Emit a message to server
//     socket.emit("chatMessage", msg);
  
//     //clear Input and focus on Enter message box
//     e.target.elements.msg.value = "";
//     e.target.elements.msg.focus();
//   });
  
//   // TODO 3. UDF to format the Output message to DOM
//   /* 
//     * MESSAGE CLASS FORMAT in index.html 
//       class "chat-messages" is wrapper class containing:
//           class "message" for EACH message that contains
//               2 paragraphs for NAME of User and TEXT 
//   */
//   function outputMessage(message) {
//     const div = document.createElement("div");
//     div.classList.add("message");
//     div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
//       <p class = "text"> 
//           ${message.text}
//       </p>`;
//     document.querySelector(".chat-messages").appendChild(div); //Append a new div to every new chatMessage
//   }
  
//   //TODO 4. UDF to - add room name to DOM & - add users list to DOM
//   function outputRoomName(room) {
//     roomName.innerText = room;
//   }
  
//   function outputUsers(users) {
//     userList.innerHTML = `
//           ${users.map((user) => `<li>${user.username}</li>`).join("")}
//       `;
//   }
  