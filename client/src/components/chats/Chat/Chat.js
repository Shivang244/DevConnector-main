import React,{useState,useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'
import InfoBar from "../InfoBar/InfoBar"
import Input from "../Input/Input"
import Messages from "../Messages/Messages"
let socket;
const Chat =({location})=>{
    const[name,setName]=useState('');
    const [room,setRoom]=useState('');
    const [message,setMessage]=useState('');
    const [messages,setMessages]=useState([]);
    useEffect(()=>{
        const {name,room}=queryString.parse(location.search);

        socket=io('http://localhost:5000', { transports : ['websocket'] });

        setName(name);
        setRoom(room);
        socket.emit('joinRoom',{name,room},()=>{
        });

        return ()=>{
            socket.disconnect();

            socket.off();
        }

        
    },['http://localhost:5000',location.search]);

    useEffect(()=>{
        socket.on('message',(message)=>{
            setMessages([...messages,message]);
        })
    },[messages])

    //function for sending messages
    const sendMessage=(event)=>{
        event.preventDefault();
        if(message){
            socket.emit('chatMessage',message,()=>setMessage(''));
        }
    }

    console.log(message,messages);


    return(
        <>
        <h1 className="large text-primary">Chat</h1> 
            
             <div class="chat-container">
            <InfoBar room={room}/>
            <Messages messages={messages} name={name}/>  

            <div class="chat-form-container">
                            <form id="chat-form">
                            <input
                                id="msg"
                                type="text"
                                placeholder="Enter Message"
                                required
                                autocomplete="off"
                                value={message} onChange={(event)=>setMessage(event.target.value)} onKeyPress={(event)=>event.key==='Enter'?sendMessage(event):null}
                            />
                            <button class="btn btn-dark my-1" style={{color:"#ffffff",margin:"0", borderRadius:"0px"}} onClick={(event)=>sendMessage(event)}><i class="fas fa-paper-plane"></i> Send</button>
                            </form>
                        </div>

            {/* <Input message={message} setMessage={setMessage} sendMessage={sendMessage} /> */}
                {/* <input value={message} onChange={(event)=>setMessage(event.target.value)} onKeyPress={(event)=>event.key==='Enter'?sendMessage(event):null} /> */}  
            </div>
            </>
    )
    
}

export default Chat;
