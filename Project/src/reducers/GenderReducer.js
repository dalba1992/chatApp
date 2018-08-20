import {
  GENDER_CHANGED
  } from '../actions/types'
  
  const INITIAL_STATE = {
    gender: 'gender'
  }
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GENDER_CHANGED:
        return { ...state, [action.payload.prop]: action.payload.gender }
      default:
        return state
    }
  }
  