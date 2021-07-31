import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEvent } from '../../actions/collab';

const EventForm = ({ addEvent }) => {
    const [text, setText] = useState('');
    const [name,setName]=useState('');
    const [eventName,setEventName]=useState('');
    const avatar="abc"
    const[type,setType]=useState('')
    const[organizer,setOrganizer]=useState('')
    const[location,setLocation]=useState('')
    const[membersRequired,setMember]=useState(0)
    const[etd,setETD]=useState('')
    return (
        <div className='post-form'>
            <div className='bg-primary p'>
                <h3>Say Something...</h3>
            </div>
            <form
                className='form my-1'
                onSubmit={e => {
                    addEvent({ name,eventName,avatar,type,organizer,location,text,membersRequired,etd });
                    setText('');
                    setName('');
                    setEventName('');
                    setType('');
                    setOrganizer('');
                    setLocation('');
                    setMember(0);
                    setETD('');
                }}
            >
                <textarea
                    name='text'
                    className="foInp"
                    cols='30'
                    rows='3'
                    placeholder='About Event'
                    value={text}
                    onChange={e => setText(e.target.value)}
                    required
                    style={{resize:"none"}}
                />
                <input type="text" 
                    className="foInp"
                    placeholder="Event name" onChange={(e)=>{setEventName(e.target.value)}} />
                <input type="text" 
                    className="foInp"
                    placeholder="Event type" onChange={(e)=>{setType(e.target.value)}} />
                <input type="text" 
                    className="foInp"
                    placeholder="Event organizer" onChange={(e)=>{setOrganizer(e.target.value)}} />
                <input type="text" 
                    className="foInp"
                    placeholder="Event location" onChange={(e)=>{setLocation(e.target.value)}} />
                <div style={{display:"flex"}}>
                    <input type="number" 
                    className="foInp"
                    id="membNos" placeholder="Enter members required" onChange={(e)=>{setMember(e.target.value)}} />
                    <input type="date" 
                    className="foInp"
                    placeholder="Enter date of finish" style={{width:"40%"}} onChange={(e)=>{setETD(e.target.value)}} />
                </div>
                <input
                    type='submit'
                    className='btn btn-dark my-1'
                    style={{float: "right", marginRight: "20%"}}
                    value='Submit'
                />
            </form>
        </div>
    );
};

EventForm.propTypes = {
    addEvent: PropTypes.func.isRequired,
};

export default connect(null, { addEvent })(EventForm);