
import {firebaseRef} from '../firebase/firebase'

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  REGISTER_USER,
  DELETE_ERROR,
  SIGN_OUT
} from './types'

import { Actions } from 'react-native-router-flux'
/*
Listen for changes in the email text input
*/

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  }
}

/*
Listen for changes in the email-password text input
*/

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  }
}

/*
Sign in - if a user already have created a profile it will be redirected to "selectStatus"
if a user has created a account but not yet created a profile it will be redirected to "createProfile"
*/

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER })
    firebaseRef.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSucess(dispatch, user))
      .then(() => {
        let userId = firebaseRef.auth().currentUser.uid

        return firebaseRef.database().ref(`/users/${userId}`).once('value').then(function (snapshot) {
          if (!snapshot.val()) {
            Actions.profile()
          } else if (snapshot.val()) {
            Actions.main()
          }
        })
      })
      .catch(() =>
        loginUserFail(dispatch))
      .catch(() => loginUserFail(dispatch))
  }
}

/*
Sign out a user
*/

export const signOut = () => {
  return (dispatch) => {
    dispatch({ type: SIGN_OUT })
    firebaseRef.auth().signOut().then(function () {
      console.log('Signed Out')
    }, function (error) {
      console.error('Sign Out Error', error)
    })
  }
}

/*
Register user - redirected to "createProfile" scene
*/

export const registerUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: REGISTER_USER })
    firebaseRef.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        const { currentUser } = firebaseRef.auth()
        firebaseRef.database().ref(`/users/${currentUser.uid}/profile`)
        .update({ email })
      })
      .then(user => loginUserSucess(dispatch, user))
      .then(() => {
        Actions.profile()
      })
      .catch(() => loginUserFail(dispatch))
      .catch(() => loginUserFail(dispatch))
  }
}

/*
Removes error messages
*/
export const deleteErrorMessage = () => {
  return (dispatch) => {
    dispatch({type: DELETE_ERROR})
  }
}

/*
If log in success, dispatch LOGIN_USER_SUCESS
*/

const loginUserSucess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCESS,
    payload: user
  })
}

/*
If log in fails, dispatch LOGIN_USER_FAIL
*/

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL })
}
