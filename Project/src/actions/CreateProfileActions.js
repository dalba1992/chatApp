import { firebaseRef } from '../firebase/firebase'
var moment = require('moment')

import {
  FIRST_NAME_CHANGED,
  SECOND_NAME_CHANGED,
  AGE_CHANGED,
  CREATE_PROFILE
} from './types'

import { Actions } from 'react-native-router-flux'

/*
Listen for changes in create profiles name input.
*/

export const firstNameChanged = (text) => {
  return {
    type: FIRST_NAME_CHANGED,
    payload: text
  }
}

/*
Listen for changes in create profiles name input.
*/

export const secondNameChanged = (text) => {
  return {
    type: SECOND_NAME_CHANGED,
    payload: text
  }
}

export const nameChanged = (text) => {
  return {
    type: SECOND_NAME_CHANGED,
    payload: text
  }
}

/*
Listen for changes in create profiles age input.
*/

export const ageChanged = (number) => {
  return {
    type: AGE_CHANGED,
    payload: number
  }
}

/*
Saves profile to firebase datastore and then redirect to selecStatus scene
*/

export const createProfiles = ({ name, secondName, age }) => {
  return (dispatch) => {
    const { currentUser } = firebaseRef.auth()
    age = moment().diff(age, 'years', false) // uses moment.js to parse the date dd-mm-year to age

    dispatch({ type: CREATE_PROFILE })
    firebaseRef.database().ref(`/users/${currentUser.uid}/profile`)
            .update({ name, secondName, age })
            .then(() => {
              return Actions.selectStatus()
            })
  }
}
