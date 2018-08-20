import {firebaseRef} from '../firebase/firebase'

import {
 DISTANCE_CHANGED,
 UPDATE_LIST_SUCCESS
} from './types'

/*
Listen for changes in the selection of distance,
*/

const calulatorDistance = (lat1, lat2, lon11, lon2) => {
  return 10
}
export const fetchDistanceList = (index) => {
  return (dispatch) => {
    const arrayToFilter = []

    firebaseRef.database().ref().child('users')
        .on('value', snapshot => {
          let snap = snapshot.val()
        // Get acces to the keys in the object i got from firebase
          let keys = Object.keys(snap)
        //  iterate the keys and put them in an User object
          for (var i = 0; i < keys.length; i++) {
            let k = keys[i]
            let key = k
            let name = snap[k].profile.name
            let secondName = snap[k].profile.secondName
            let age = snap[k].profile.age
            let status = snap[k].profile.status
            let profile_picture = snap[k].profile.profile_picture
            let prop = snap[k].profile.prop
            let value = snap[k].profile.value
            let gender = snap[k].profile.gender
            let latitude = snap[k].profile.latitude
            let longitude = snap[k].profile.longitude
            let position = snap[k].profile.position
            let descriptionText = snap[k].profile.descriptionText
            let email = snap[k].profile.email

            var users = {
              key: '',
              name: '',
              secondName: '',
              age: '',
              status: Boolean,
              profile_picture: '',
              prop: '',
              value: '',
              gender: '',
              latitude: '',
              longitude: '',
              position: '',
              descriptionText: '',
              work: '',
              education: '',
              hobby: '',
              favoriteplace: '',
              email: ''
            }
            users.key = key
            users.name = name
            users.secondName = secondName
            users.age = age
            users.status = status
            users.profile_picture = profile_picture
            users.prop = prop
            users.value = value
            users.gender = gender
            users.latitude = Math.floor(latitude)
            users.longitude = Math.floor(longitude)
            users.position = position
            users.descriptionText = descriptionText
            users.email = email

          // adding the user object to an array
            arrayToFilter.push(users)
          }

          let userId = firebaseRef.auth().currentUser.uid
          firebaseRef.database().ref(`/users/${userId}`).once('value').then(function (snapshot) {
            let snap = snapshot.val()

          // Get acces to the keys in the object i got from firebase
            let keys = Object.keys(snap)

          //  iterate the key
            for (var i = 0; i < keys.length; i++) {
              let k = keys[i]
              currentUsersLatitude = snap[k].latitude
              currentUsersLongitude = snap[k].longitude
            }

            if (index === 0) {
              alert(calulatorDistance(0, 0, 0, 0))

            // let arr = arrayToFilter.filter(child => child.status === true && Math.floor(currentUsersLatitude) === child.latitude)

            // dispatch({ type: UPDATE_LIST_SUCCESS, payload: arr })

            // arrayToFilter.length = 0
            } else if (index === 1) {

            // let arr = arrayToFilter.filter(child => child.status === true && Math.floor(currentUsersLatitude) === child.latitude && child.gender === 'female')

            // dispatch({ type: UPDATE_LIST_SUCCESS, payload: arr })

            // arrayToFilter.length = 0

            } else if (index === 2) {

            // let arr = arrayToFilter.filter(child => child.status === true && Math.floor(currentUsersLatitude) === child.latitude && child.gender === 'male')

            // dispatch({ type: UPDATE_LIST_SUCCESS, payload: arr })

            // arrayToFilter.length = 0

            }
          })
        // Get current users Latitude to compare to the other users in the list
        })
  }
}
