import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getEvents } from "../../actions/collab";
import EventItem from "../Events/EventItem.js";
import EventForm from "../Events/EventForm.js";
import {useSelector} from "react-redux";
import {Link} from 'react-router-dom'
import axios from "axios";

const Events = () => {
  const axios=require('axios')
  const [loading, isLoading] = useState(true);
  const[events,setEvents]=useState([])
  useEffect(async () => {
      const res=await axios.get("api/collab");
      console.log(res.data)
      const zep=await axios.get("api/users/events");
      setEvents(res.data)
      isLoading(false)
  }, []);

  return loading || events === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div style={{display: "flex", justifyContent:"space-between"}} >
        <h1 className="large text-primary">Events</h1>
        <Link to='/join' className="btn btn-primary my-1"> Chat </Link>
      </div>  
      <p className="lead">
        <i className="fas fa-user"></i>Welcome to the Community
      </p>
      <EventForm />
      <div style={{marginTop:"120px"}}>
        {events.map((event) => (
          <EventItem event={event} />
        ))}
      </div>
    </Fragment>
  );
};

export default Events;
