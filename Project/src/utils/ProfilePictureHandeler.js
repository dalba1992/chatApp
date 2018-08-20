import React, { Component } from 'react'
import firebase from 'firebase'
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native'
import { Avatar } from 'react-native-elements'
import { fetchProfileData } from '../actions'
import _ from 'lodash'
import { connect } from 'react-redux'
import RNFetchBlob from 'react-native-fetch-blob'
import ImagePicker from 'react-native-image-crop-picker'

/*
Handles the upload profile picture
*/

class ProfilePictureHandeler extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      dp: null
    }
  }

/*
Fecthes the profile data
*/
  componentWillMount () {
    this.props.fetchProfileData()
  }

/*
If there is a profile picture, render the profile picture in the avatar
If there´s no profile picture render default avatar image
*/

  renderAvatarOrProfilePic () {
    if (!this.props.profile[0] || this.props.profile[0] === undefined) {
      return <Avatar
        size={180}
        source={require('../../src/assets/tro.png')}
        activeOpacity={0.7}

/>
    } else if (!this.props.profile[0].hasOwnProperty('profile_picture')) {
      return <Avatar
        size={180}
        source={require('../../src/assets/tro.png')}
        activeOpacity={0.7}
/>
    } else {
      return <Avatar
        rounded
        size={210}
        source={{ uri: this.props.profile[0].profile_picture}}
        activeOpacity={0.7}
        avatarStyle={{borderColor: 'white', borderWidth: 1}}

    />
    }
  }

  openPicker () {
    // Starting the spinner
    this.setState({ loading: true })
    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob

    // Logged in user
    const { currentUser } = firebase.auth()

    // Opens the picker
    ImagePicker.openPicker({
      cropping: true,
      height: 550,
      width: 600,
      mediaType: 'photo'
    }).then(image => {
      const imagePath = image.path

      let uploadBlob = null

      const imageRef = firebase.storage().ref(`/users/${currentUser.uid}/profile`).child('dp.jpg')

      let mime = 'image/jpg'
      fs.readFile(imagePath, 'base64')
            .then((data) => {
              // Create it as blob
              return Blob.build(data, { type: `${mime};BASE64` })
            })
          .then((blob) => {
            uploadBlob = blob
            return imageRef.put(blob, { contentType: mime })
          })
           .then(() => {
             // Upload the created blob and get the url for the image
             uploadBlob.close()
             return imageRef.getDownloadURL()
           })
           .then((url) => {
            // Uploads the image-url as profile_picture in firebase database
             firebase.database().ref(`/users/${currentUser.uid}/profile`).update({
               profile_picture: url
             })
             let obj = {}
             obj['loading'] = false
             obj['dp'] = url
             this.setState(obj)
           })
           .catch((error) => {
             if (error) {
               console.log(error)
             }
           })
    }).catch((error) => {
      if (error) {
        this.setState({
          loading: false,
          dp: null
        })
      }
    })
  }

  render () {
    // The selected picture
    const selectedPicture = this.state.dp ? (<TouchableOpacity onPress={() => this.openPicker()}>
      <Avatar
        size={210}
        rounded
        source={{ uri: this.state.dp }}
        activeOpacity={0.7}
        avatarStyle={{borderColor: 'white', borderWidth: 1}}

/>
    </TouchableOpacity>) : (

      <TouchableHighlight onPress={() => this.openPicker()} >
        {this.renderAvatarOrProfilePic()}
      </TouchableHighlight>

)
    // Default picture
    const standardPicture = this.state.loading ? <ActivityIndicator animating={this.state.loading} /> : (
      <View>
        {selectedPicture}
      </View>
  )

    return (
      <TouchableHighlight onPress={() => this.openPicker()} >
          {standardPicture}
      </TouchableHighlight>

    )
  }
}

const mapStateToProps = state => {
  const profile = _.map(state.profile, (val) => {
    return {...val}
  })

  return {
    profile: profile
  }
}

export default connect(mapStateToProps, {fetchProfileData})(ProfilePictureHandeler)
