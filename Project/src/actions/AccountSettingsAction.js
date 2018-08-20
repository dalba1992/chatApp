import { firebaseRef } from '../firebase/firebase'

import {
  EDIT_NAME_CHANGED,
  EDIT_PROFILE,
  EMAIL_UPDATED,
  ADD_EMAIL
} from './types'

import { Actions } from 'react-native-router-flux'

export const nameChangedEdit = (text) => {
  return {
    type: EDIT_NAME_CHANGED,
    payload: text
  }
}

/*
Listen for changes if onlu the name is changed, and update it.
*/
export const updateProfileName = ({ name }) => {
  return (dispatch) => {
    // Logged in user
    const { currentUser } = firebaseRef.auth()

    dispatch({ type: EDIT_PROFILE })
    firebaseRef.database().ref(`/users/${currentUser.uid}/profile`)
      .update({ name })
      .then(() => {
        console.log('Edited profile')
        return Actions.pop('accountSettings')
      })
  }
}

export const emailChangedEdit = text => {
  return {
    type: EMAIL_UPDATED,
    payload: text
  }
}

export const updateEmails = ({ email }) => {
  return dispatch => {
    dispatch({ type: ADD_EMAIL })

    var user = firebaseRef.auth().currentUser

    firebaseRef.database().ref(`/users/${user.uid}/profile`)
    .update({ email })
    .then(function () {
      console.log('email changed')
      console.log('verification email sent')
    })
    user
      .updateEmail(email)
      .then(function () {
        user
          .sendEmailVerification()
          .then(function () {
            console.log('Updated email')
            return Actions.pop('accountSettings')
          })
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
