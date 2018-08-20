import {firebaseRef} from '../firebase/firebase'

import {
UPDATE_CURRENT_MODE
} from './types'

/*  
Sets the current mood to current user in firebase.
*/
export const currentMood = ({ prop, value }) => {
  return (dispatch) => {
    // Logged in user
    const { currentUser } = firebaseRef.auth()

    dispatch({ type: UPDATE_CURRENT_MODE,
      payload: { prop, value } })

    firebaseRef.database().ref(`/users/${currentUser.uid}/profile`)
            .update({ prop, value })
            .then(() => {
              console.log('updated mood')
            })
  }
}
