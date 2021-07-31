import React,{useEffect} from 'react'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import './Join.css'
const Join =()=>{
    const[name,setName]=useState('');
    const [room,setRoom]=useState('event1');
    const[events,setEvents]=useState([]);
    const axios=require('axios')
    useEffect(async()=>{
        const res=await axios.get("/api/users/events");
        console.log(res)
    },[])
    
    return(
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event)=>setName(event.target.value)} /></div>
                {/* <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event)=>setRoom(event.target.value)} /></div> */}
                <div>
                    <select className="joinInput mt-20" onChange={(event)=>setRoom(event.target.value)} >  
                        <option className="joinInput mt-20" hidden selected>Select a room</option>
                        <option id="opt" value="zHack">zHack</option>
                        <option id="opt" value="WazHack">WazHack</option>
                    </select>

                </div>
                <Link onClick={event=>(!name||!room)?event.preventDefault():null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="btn btn-dark mt-20" type="submit">Join Chat</button>
                </Link>
            </div>
        </div>

    )
    
}

export default Join;