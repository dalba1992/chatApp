import {
   SET_STATUS_TO_OUT,
   SET_STATUS_TO_NOT_OUT
  } from '../actions/types'
  
  const INTIAL_STATE = {
   status: false
  }
  
  export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
     
        case SET_STATUS_TO_OUT:
        return { ...state, status: true }
     
        case SET_STATUS_TO_NOT_OUT:
        return { ...state, status: false }
     
        default:
        return state
    }
  }
  