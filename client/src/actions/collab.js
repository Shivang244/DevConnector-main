import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_EVENT,
  GET_EVENTS,
  EVENT_ERROR,
  DELETE_EVENT,
  ADD_EVENT,
} from "./types";

//get events
export const getEvents = () => async (dispatch) => {
  try {
    const res = await axios.get("api/collab");
    console.log(res.data);
    dispatch({
      type: GET_EVENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//delete events
export const deleteEvent = (id) => async (dispatch) => {
  try {
    await axios.delete(`api/collab/${id}`);

    dispatch({
      type: DELETE_EVENT,
      payload: id,
    });

    dispatch(setAlert("Event Removed", "success"));
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//add events
export const addEvent = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("api/collab", formData, config);

    dispatch({
      type: ADD_EVENT,
      payload: res.data,
    });

    dispatch(setAlert("Event Created", "success"));
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: {
        // msg: err.response.statusText,
        // status: err.response.status,
      },
    });
  }
};

//get event
export const getEvent = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/collab/${id}`);

    dispatch({
      type: GET_EVENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
