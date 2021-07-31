import {
    GET_EVENT,
    GET_EVENTS,
    EVENT_ERROR,
    DELETE_EVENT,
    ADD_EVENT,
} from '../actions/types'


const initialState={
    events:[],
    event:null,
    loading:true,
    error:{}
}

export default function(state=initialState,action){
    const {type,payload}=action;

    switch(type){
        case GET_EVENTS:
            return{
                ...state,
                events:payload,
                loading:false
            }

        case GET_EVENT:
            return{
                ...state,
                event:payload,
                loading:false
            }

        case ADD_EVENT:
            return{
                ...state,
                events:[payload,...state.events],
                loading:false
            }

        case DELETE_EVENT:
            return{
                ...state,
                events:state.events.filter(event=> event._id!==payload),
                loading:false
            }

        case EVENT_ERROR:
            return{
                ...state,
                error:payload,
                loading:false
            }
        
            default:
                return{
                    state
                }
    }

}