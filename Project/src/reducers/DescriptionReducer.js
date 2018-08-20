import {
    DESCRIPTION_TEXT_CHANGED
    } from '../actions/types'
    
    const INITIAL_STATE = {
      descriptionText: ''
    }
    
    export default (state = INITIAL_STATE, action) => {
      switch (action.type) {
        case DESCRIPTION_TEXT_CHANGED:
        return { ...state, descriptionText: action.payload }
        default:
          return state
      }
    }
    