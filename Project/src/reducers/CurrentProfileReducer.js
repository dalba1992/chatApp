import {
    CURRENT_PROFILE_DATA
   } from '../actions/types'

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CURRENT_PROFILE_DATA:
      return action.payload
    default:
      return state
  }
}
