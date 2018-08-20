import {
    UPDATE_MODAL_DATA
    } from '../actions/types'
    
    const INITIAL_STATE = {
      modalData: {}
    }
    
    export default (state = INITIAL_STATE, action) => {
      switch (action.type) {
        case UPDATE_MODAL_DATA:
        return { ...state, modalData: action.payload }
        default:
          return state
      }
    }
    