import {
    DISTANCE_CHANGED
} from '../actions/types'

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DISTANCE_CHANGED:
      return action.payload
    default:
      return state
  }
}