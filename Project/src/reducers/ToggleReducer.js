import {
  TOGGLE_OFF,
  TOGGLE_ON,
  TOGGLE_OFF_PROFILEMODAL_IN_LIST,
  TOGGLE_ON_PROFILEMODAL_IN_LIST,
    TOGGLE_ON_HEADERMODAL,
    TOGGLE_OFF_HEADERMODAL
   } from '../actions/types'

const INITIAL_STATE = {
  toggle: false,
  toggleHeaderModal: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_OFF:
      return { ...state, toggle: false }
    case TOGGLE_ON:
      return { ...state, toggle: true }
    case TOGGLE_OFF_PROFILEMODAL_IN_LIST:
      return { ...state, toggleProfileModal: false }
    case TOGGLE_ON_PROFILEMODAL_IN_LIST:
      return { ...state, toggleProfileModal: true }
    case TOGGLE_ON_HEADERMODAL :
      return { ...state, toggleHeaderModal: true }
    case TOGGLE_OFF_HEADERMODAL :
      return { ...state, toggleHeaderModal: false }
    default:
      return state
  }
}
