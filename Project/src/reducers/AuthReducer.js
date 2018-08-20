/*
Reducers watch for an action and then updates the state with the new payload
*/

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  REGISTER_USER,
  DELETE_ERROR,
  SIGN_OUT
} from '../actions/types'

const INTIAL_STATE = {
  email: '',
  password: '',
  loading: false
}

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload, error: '' }

    case PASSWORD_CHANGED:
      return {...state, password: action.payload, error: ''}

    case LOGIN_USER_SUCESS:
      return {...state, user: action.payload, error: '', loading: false}
       // if sign in sucess  ' ' error sate

    case LOGIN_USER_FAIL:
      return {...state, error: 'Authentication fail', password: '', loading: false}
      // if fail 0 password

    case LOGIN_USER:
      return {...state, loading: true, error: ''}

    case REGISTER_USER:
      return {...state, loading: true, error: ''}

    case SIGN_OUT:
      return {...state, loading: false, error: '', email: '', password: ''}

    case DELETE_ERROR:
      return {...state, error: ''}
    default:
      return state
  }
}
