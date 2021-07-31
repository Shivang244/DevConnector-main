import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEvent } from "../../actions/collab";
const EventItem = ({
  auth,
  deleteEvent,
  event: {
    _id,
    text,
    name,
    eventName,
    avatar,
    user,
    organizer,
    type,
    location,
    membersRequired,
    date,
    etd,
  },
  showActions,
}) => (
  <div  className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <img className="round-img" src={avatar} alt="" />
        <h4>{name}</h4>
      </Link>
    </div>
    <div className="evCarz">
      <p className="my-1"><span className="evh">EVENT NAME:</span > &nbsp; <span className="eventCardFields"> {eventName} </span> </p>    
      <p className="my-1"><span className="evh">DESCRIPTION:</span > &nbsp; <span className="eventCardFields">{text}</span></p>
      <p className="my-1"><span className="evh">ORGANIZER:</span > &nbsp; <span className="eventCardFields">{organizer}</span></p>
      <p className="my-1"><span className="evh">LOCATION:</span > &nbsp; <span className="eventCardFields">{location}</span></p>
      <p className="my-1"><span className="evh">MEMBERS REQ:</span > &nbsp; <span className="eventCardFields">{membersRequired}</span></p>
      <p>
      <span className="evh">EVENT ON:</span > &nbsp; <span className="eventCardFields"><Moment format="YYYY/MM/DD">{etd}</Moment></span>
      </p>  

      {showActions && (
        <Fragment>
          {/* {!auth.loading && user === auth.user._id && ( */}
            <button style={{float:"right"}}
              onClick={() => window.location.reload()}
              type="button"
              className="btn btn-success"
            >
              Accept
            </button>
          {/* )} */}
        </Fragment>
      )}
    </div>
  </div>
);

EventItem.defaultProps = {
  showActions: true,
};

EventItem.propTypes = {
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteEvent })(EventItem);
