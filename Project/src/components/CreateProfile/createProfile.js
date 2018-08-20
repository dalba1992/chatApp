import React, { Component } from 'react'
import {
  View,
  Picker,
  TextInput,
  Text,
  Keyboard,
  TouchableOpacity
} from 'react-native'
import { Tile, Button, Icon } from 'react-native-elements'
import { Spinner } from '../common'
import { connect } from 'react-redux'
import { firstNameChanged, secondNameChanged, ageChanged, createProfiles, updateGender } from '../../actions'
import ProfilePictureHandeler from '../../utils/ProfilePictureHandeler'
import styles from './CreateProfile.style'
import { firebaseRef } from '../../firebase/firebase'
import Geocoder from 'react-native-geocoding'
import ModalBox from 'react-native-modalbox'
import DatePicker from 'react-native-datepicker'

class createProfile extends Component {
  constructor () {
    super()
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3,
      date: ''

    }
  }

  componentDidMount () {
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
  Listen for changes in the name text input
  */

  onFirstNameChange (text) {
    this.props.firstNameChanged(text)
  }

  /*
  Listen for changes in the name text input
  */

  onSecondNameChange (text) {
    this.props.secondNameChanged(text)
  }
  /*
  Listen for changes in the age text input
  */

  onAgeChange (number) {
    this.props.ageChanged(number)
  }

  /*
  When the button is press call createPRofiles with the name and the age
  Di smisses the keyboard.
  */

  onButtonPress () {
    const { name, secondName, age } = this.props
    this.props.createProfiles({ name, secondName, age })
    Keyboard.dismiss()
  }

  onButtonPressModal () {
    this.refs.modal2.close()
  }
  /*
  If the state is set to loading render spinner
  else render the button.
  */

  renderButton () {
    if (this.props.loading) {
      return <Spinner size='large' />
    }
    return (
      <Button
        icon={<Icon name='account-plus' type='material-community' size={20} color='white' />}
        title='Register'
        titleStyle={styles.registerButtonTitleStyle}
        buttonStyle={styles.registerButton}
        onPress={this.onButtonPress.bind(this)}
      />
    )
  }

  render () {
    return (
      <View style={styles.container}>

        <View style={styles.backgroundTile}>
          <Tile
            imageSrc={require('../../assets/darkgreenbackground.png')}
            imageContainerStyle={{}}
            activeOpacity={1}
            title='Create Profile'
            featured
            caption='Click on the image for uploading a profile picture'
            captionStyle={styles.tileCaptionStyle}
            titleStyle={styles.titleStyles}
            height={1490}
          />

        </View>

        {/* Profile Picture */}

        <View style={styles.uploadImageContainer} >
          <ProfilePictureHandeler />
        </View>

        {/* Text inputs */}

        <TouchableOpacity onPress={() => this.refs.modal1.open()}>
          <Text style={styles.texts}>
            {this.props.name || 'First Name'}
          </Text>
        </TouchableOpacity>

        <ModalBox style={[styles.modal, styles.modalStyle]} position={'center'} ref={'modal1'} >
          <TextInput
            maxLength={41}
            placeholder='"Write Your First Name"'
            placeholderTextColor='black'
            returnKeyType='done'
            value={this.props.name}
            onChangeText={this.onFirstNameChange.bind(this)}
            style={styles.textInputModalStyle}
          />
          <Button
            icon={<Icon name='account-plus' type='material-community' size={20} color='white' />}
            title='Save'
            titleStyle={styles.registerButtonTitleStyle}
            buttonStyle={styles.modalButtonSave}
            onPress={() => this.refs.modal1.close()} />
        </ModalBox>

        <View style={styles.hairline} />

        <TouchableOpacity onPress={() => this.refs.modal2.open()}>
          <Text style={styles.texts}>
            {this.props.secondName || 'Second Name'}
          </Text>
        </TouchableOpacity>

        <ModalBox style={[styles.modal, styles.modalStyle]} position={'center'} ref={'modal2'} >
          <TextInput
            maxLength={41}
            placeholder='"Write Your Second Name"'
            placeholderTextColor='black'
            returnKeyType='done'
            value={this.props.secondName}
            onChangeText={this.onSecondNameChange.bind(this)}
            style={styles.textInputModalStyle}
          />
          <Button
            icon={<Icon name='account-plus' type='material-community' size={20} color='white' />}
            title='Save'
            titleStyle={styles.registerButtonTitleStyle}
            buttonStyle={styles.modalButtonSave}
            onPress={() => this.refs.modal2.close()} />
        </ModalBox>

        <View style={styles.hairline} />

        <TouchableOpacity onPress={() => this.refs.modal3.open()}>
          <Text style={styles.texts}>
            {this.props.age || 'Age'}
          </Text>
        </TouchableOpacity>

        <ModalBox style={[styles.modal, styles.modalStyle]} position={'center'} ref={'modal3'}>

          <DatePicker
            style={{ width: 200 }}
            date={this.props.age}
            mode='date'
            placeholder='Select Date'
            format='YYYY-MM-DD'
            minDate='1900-01-01'
            maxDate='2099-01-01'
            confirmBtnText='Confirm'
            cancelBtnText='Cancel'
            customStyles={{
              dateIcon: styles.dateStyle,
              dateInput: styles.dateInputStyle
            }}
            onDateChange={(date) => this.onAgeChange(date)}
          />

          <Button
            icon={<Icon name='account-plus' type='material-community' size={20} color='white' />}
            title='Save'
            titleStyle={{ fontFamily: 'GeosansLight' }}
            buttonStyle={styles.modalButtonSave}
            onPress={() => this.refs.modal3.close()} />
        </ModalBox>

        <View style={styles.hairline} />

        {/* Gender Picker & Button/Spinner */}

        <View style={styles.changeStatusButtonContainer}>

          <Text style={styles.currentMoodStyle} > Select a gender : </Text>
          <Picker
            style={styles.pickerStyle}
            selectedValue={this.props.gender}
            onValueChange={gender => this.props.updateGender({ prop: 'gender', gender })}
            itemStyle={styles.pickerItemStyle}>
            <Picker.Item label='👫 Select in list' value='all' />
            <Picker.Item label='♀ Female' value='female' />
            <Picker.Item label='♂ ️Male' value='male' />
          </Picker>
        </View>

        <View style={styles.spinnerAndButton}>
          {this.renderButton()}
        </View>

      </View>
    )
  }
}

const mapStateToProps = state => {
  const { gender } = state.gender

  return {
    name: state.create.name,
    secondName: state.create.secondName,
    age: state.create.age,
    loading: state.create.loading,
    gender
  }
}

export default connect(mapStateToProps, { firstNameChanged, secondNameChanged, ageChanged, createProfiles, updateGender })(createProfile)
