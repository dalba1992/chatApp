import {firebaseRef} from '../firebase/firebase'

import {
  CURRENT_PROFILE_DATA
} from './types'

/*
Fetches and return current users profile data.
Profile data = profile in firebase database
*/
export const fetchProfileData = () => {
  return (dispatch) => {
    // Logged in user
    let userId = firebaseRef.auth().currentUser.uid
        // Check if the current signed in user have value in the database
    firebaseRef.database().ref(`/users/${userId}`).once('value').then(function (snapshot) {
      dispatch({ type: CURRENT_PROFILE_DATA, payload: snapshot.val() })
    })
  }
}
