import { firebaseRef } from '../firebase/firebase'

import {
  UPDATE_LIST_SUCCESS
} from './types'

/*
Fetch every user in the database and return a sorted list depending on the index that is passed in to the
fetchList function.
index = 0  - return all users
index = 1 - return only female users
index = 2 return only male users
*/

const calulatorDistance = (lat1, lon1, lat2, lon2) => {
  /// //////// to calculate the distance ///////
  var radlat1 = Math.PI * lat1 / 180
  var radlat2 = Math.PI * lat2 / 180

  var theta = lon1 - lon2

  var radtheta = Math.PI * theta / 180

  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
  if (dist > 1) {
    dist = 1
  }
  dist = Math.acos(dist)
  dist = dist * 180 / Math.PI
  dist = dist * 60 * 1.1515
  dist = dist * 1.609344

  dist = dist.toFixed(0)

  return dist
}

export const fetchList = (index, distanceIndex = 0) => {
  return (dispatch) => {
    const arrayToFilter = []
    var currentUsersLatitude
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
          users.latitude = latitude
          users.longitude = longitude
          users.position = position
          users.descriptionText = descriptionText
          users.email = email

          // adding the user object to an array
          arrayToFilter.push(users)
        }

        // Get current users Latitude to compare to the other users in the list
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

          // filter and creates a new array with users depending on thr conditions
          if (index === 0) {
            if (distanceIndex === 0) {
              let arr = arrayToFilter.filter(child => child.status === true && calulatorDistance(currentUsersLatitude, currentUsersLongitude, child.latitude, child.longitude) <= 10)
              dispatch({ type: UPDATE_LIST_SUCCESS, payload: arr })
              arrayToFilter.length = 0
            } else if (distanceIndex === 1) {
              let arr = arrayToFilter.filter(child => child.status === true && calulatorDistance(currentUsersLatitude, currentUsersLongitude, child.latitude, child.longitude) <= 50)
              dispatch({ type: UPDATE_LIST_SUCCESS, payload: arr })
              arrayToFilter.length = 0
            } else if (distanceIndex === 2) {
              let arr = arrayToFilter.filter(child => child.status === true && calulatorDistance(currentUsersLatitude, currentUsersLongitude, child.latitude, child.longitude) <= 100)
              dispatch({ type: UPDATE_LIST_SUCCESS, payload: arr })
              arrayToFilter.length = 0
            } else if (distanceIndex === 3) {
              let arr = arrayToFilter.filter(child => child.status === true && calulatorDistance(currentUsersLatitude, currentUsersLongitude, child.latitude, child.longitude) <= 1000)
              dispatch({ type: UPDATE_LIST_SUCCESS, payload: arr })
              arrayToFilter.length = 0
            }
          } else if (index === 1) {
            if (distanceIndex === 0) {
              let arr = arrayToFilter.filter(child => child.status === true && child.gender === 'female' &&
                calulatorDistance(currentUsersLatitude, currentUsersLongitude, child.latitude, child.longitude) <= 10)
              dispatch({ type: UPDATE_LIST_SUCCESS, payload: arr })
              arrayToFilter.length = 0
            } else if (distanceIndex === 1) {
              let arr = arrayToFilter.filter(child => child.status === true && child.gender === 'female' &&
                calulatorDistance(currentUsersLatitude, currentUsersLongitude, child.latitude, child.longitude) <= 50)
              dispatch({ type: UPDATE_LIST_SUCCESS, payload: arr })
              arrayToFilter.length = 0
            } else if (distanceIndex === 2) {
              let arr = arrayToFilter.filter(child => child.status === true && child.gender === 'female' &&
                calulatorDistance(currentUsersLatitude, currentUsersLongitude, child.latitude, child.longitude) <= 100)
              dispatch({ type: UPDATE_LIST_SUCCESS, payload: arr })
              arrayToFilter.length = 0
            } else if (distanceIndex === 3) {
              let arr = arrayToFilter.filter(child => child.status === true && child.gender === 'female' &&
                calulatorDistance(currentUsersLatitude, currentUsersLongitude, child.latitude, child.longitude) <= 1000)
              dispatch({ type: UPDATE_LIST_SUCCESS, payload: arr })
              arrayToFilter.length = 0
            }
          } else if (index === 2) {
            if (distanceIndex === 0) {
              let arr = arrayToFilter.filter(child => child.status === true && child.gender === 'male' &&
                calulatorDistance(currentUsersLatitude, currentUsersLongitude, child.latitude, child.longitude) <= 10)
              dispatch({ type: UPDATE_LIST_SUCCESS, payload: arr })
              arrayToFilter.length = 0
            } else if (distanceIndex === 1) {
              let arr = arrayToFilter.filter(child => child.status === true && child.gender === 'male' &&
                calulatorDistance(currentUsersLatitude, currentUsersLongitude, child.latitude, child.longitude) <= 50)
              dispatch({ type: UPDATE_LIST_SUCCESS, payload: arr })
              arrayToFilter.length = 0
            } else if (distanceIndex === 2) {
              let arr = arrayToFilter.filter(child => child.status === true && child.gender === 'male' &&
                calulatorDistance(currentUsersLatitude, currentUsersLongitude, child.latitude, child.longitude) <= 100)
              dispatch({ type: UPDATE_LIST_SUCCESS, payload: arr })
              arrayToFilter.length = 0
            } else if (distanceIndex === 3) {
              let arr = arrayToFilter.filter(child => child.status === true && child.gender === 'male' &&
                calulatorDistance(currentUsersLatitude, currentUsersLongitude, child.latitude, child.longitude) <= 1000)
              dispatch({ type: UPDATE_LIST_SUCCESS, payload: arr })
              arrayToFilter.length = 0
            }
          }
        })
      })
  }
}
