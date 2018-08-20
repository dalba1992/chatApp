import {firebaseRef} from '../firebase/firebase'

import {
GENDER_CHANGED
} from './types'

/*
Listen for changes in the selection of gender, and updates it to the firebase database.
*/
export const updateGender = ({ prop, gender }) => {
  return (dispatch) => {
    // Logged in user
    const { currentUser } = firebaseRef.auth()

    if (!gender) {
      console.log('Select Gender')
    }
    dispatch({ type: GENDER_CHANGED,
      payload: { prop, gender } })
    firebaseRef.database().ref(`/users/${currentUser.uid}/profile`)
            .update({ prop, gender })
            .then(() => {
              console.log('updated gender')
            })
  }
}
