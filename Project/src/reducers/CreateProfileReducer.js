import {
  FIRST_NAME_CHANGED,
  SECOND_NAME_CHANGED,
  AGE_CHANGED,
  CREATE_PROFILE,
  CREATE_PROFILE_SUCCESS
} from '../actions/types'

const INTIAL_STATE = {
  name: '',
  secondName: '',
  age: '',
  loading: false
}

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case FIRST_NAME_CHANGED:
      return { ...state, name: action.payload }
    case SECOND_NAME_CHANGED:
      return { ...state, secondName: action.payload }
    case AGE_CHANGED:
      return { ...state, age: action.payload }

    case CREATE_PROFILE:
      return { ...state, name: action.payload, age: action.payload }

    case CREATE_PROFILE_SUCCESS:
      return { ...state, INTIAL_STATE }

    default:
      return state
  }
}
