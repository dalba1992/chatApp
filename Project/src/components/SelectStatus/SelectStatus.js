import React, { Component } from 'react'
import { View, Image, Text, TouchableHighlight, ImageBackground } from 'react-native'
import styles from './SelectStatus.style'
import { connect } from 'react-redux'
import { upDateStatus, upDateStatusToNotGoOut } from '../../actions'
import {firebaseRef} from '../../firebase/firebase'
import Geocoder from 'react-native-geocoding'
import { BlurView } from 'react-native-blur'

class SelectStatus extends Component {
  componentWillMount () {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { currentUser } = firebaseRef.auth()

        firebaseRef.database().ref(`/users/${currentUser.uid}/profile`)
          .update({ latitude: position.coords.latitude, longitude: position.coords.longitude })
          .then(() => {
            Geocoder.init('AIzaSyAVjxpARJCUf8w76KlANf7VDBxX_d3j4Os')
            Geocoder.from(position.coords.latitude, position.coords.longitude)
              .then(json => {
                var currentTown = json.results[0].address_components[3].long_name
                firebaseRef.database().ref(`/users/${currentUser.uid}/profile`)
                  .update({ position: currentTown })
                console.log('postion added')
              })
              .catch(error => console.warn(error))
          })
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }
  /*
  Set the status to true
  */

  onlineButtonPress () {
    this.props.upDateStatus({ status: true })
  }

  /*
  Set the status to false
  */

  offlineGoOutButtonPress () {
    this.props.upDateStatusToNotGoOut({ status: false })
  }

  render () {
    return (
      <ImageBackground
        source={require('../../assets/couldbe.jpg')}
        style={styles.container}
      >
        <BlurView
          style={styles.absolute}
          blurType='dark'
          blurAmount={10}
          height={995}
        />
        <View style={styles.headerContainer}>
          <Text style={styles.titleStyles}>Want to chat? </Text>
          <Text style={styles.underTextStyles}>Click on the icon of your choice</Text>
        </View>

        <View style={styles.iconsContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <TouchableHighlight underlayColor='transparent' onPress={() => this.onlineButtonPress()} >
              <Image
                style={{ width: 145, height: 145 }}
                source={require('../../assets/chatting.png')}
        />
            </TouchableHighlight>
            <TouchableHighlight underlayColor='transparent' onPress={() => this.offlineGoOutButtonPress()} >

              <Image
                style={{ width: 145, height: 145 }}
                source={require('../../assets/chatting.png')}
        />
            </TouchableHighlight>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingTop: 5, marginLeft: 3}} >
            <Text style={{fontFamily: 'GeosansLight', color: 'white'}}> I want to chat </Text>
            <Text style={{fontFamily: 'GeosansLight', color: 'white'}}> Want to chat but offline</Text>
          </View>


        </View>
      </ImageBackground>

    )
  }
}

const mapStateToProps = state => {
  return {
    status: state.status.status
  }
}

export default connect(mapStateToProps, { upDateStatus, upDateStatusToNotGoOut })(SelectStatus)
