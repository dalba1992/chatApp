import {
    UPDATE_CURRENT_MODE
    } from '../actions/types'
    
    const INITIAL_STATE = {
      mood: ''
    }
    
    export default (state = INITIAL_STATE, action) => {
      switch (action.type) {
        case UPDATE_CURRENT_MODE:
          return { ...state, [action.payload.prop]: action.payload.value }
        default:
          return state
      }
    }
    