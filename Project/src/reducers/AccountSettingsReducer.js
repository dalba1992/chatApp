import {
    EMAIL_UPDATED,
    EDIT_NAME_CHANGED,
    ADD_EMAIL,
    DESCRIPTION_TEXT_CHANGED,
    ADD_DESCRIPTION_TEXT,
    EDIT_PROFILE

} from '../actions/types'

const INTIAL_STATE = {
  name: '',
  email: '',
  descriptionText: ''
}
export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case EDIT_NAME_CHANGED:
      return {...state, name: action.payload}
    case EDIT_PROFILE:
      return {...state, name: action.payload}

    case EMAIL_UPDATED:
      return { ...state, email: action.payload }

    case ADD_EMAIL:
      return { ...state, email: action.payload }

    case DESCRIPTION_TEXT_CHANGED:
      return { ...state, descriptionText: action.payload }

    case ADD_DESCRIPTION_TEXT:
      return { ...state, descriptionText: action.payload }

    default:
      return state
  }
}
