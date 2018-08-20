import React, { Component } from 'react'
import { View, Text, Picker, TextInput, TouchableOpacity } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchProfileData, signOut, currentMood, descriptionTextChanged, updateDescriptionText, toggleOn, toggleOff, toggleOnHeaderModal, toggleOffHeaderModal } from '../../actions'
import Modal from 'react-native-modal'
import { Spinner } from '../common'
import ModalBox from 'react-native-modalbox'
import styles from './ProfileModal.style'
import ProfilePictureHandeler from '../../utils/ProfilePictureHandeler'

class ProfileModal extends Component {
  constructor () {
    super()
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3
    }
  }
      // Call fetchList to get access to the users

  componentWillMount () {
    this.props.fetchProfileData()
  }

      // toggle if to show modal or notx
  toggleModal () {
    this.props.toggleOffHeaderModal({toggleHeaderModal: false})
  }

      // Render selectStatus Scene & Closes modal

  changeStatus () {
    Actions.selectStatus()
    this.toggleModal()
  }

  accountSettings () {
    Actions.accountSettings()
    this.toggleModal()
  }

  goToChatList () {
    Actions.chatList({ data: this.props.profile })
    this.toggleModal()
  }

      // Listen for changes in the descripotion text
  descriptionText (text) {
    this.props.descriptionTextChanged(text)
  }

  onButtonPress () {
    this.refs.modal1.close()
    this.props.fetchProfileData()
  }

      // Listen for changes in the current picker & updates the profile
  currentMood (value) {
    this.props.currentMood({ prop: 'mood', value })
    this.props.fetchProfileData()
  }

      // When modal is true/visibal show this content

  profile () {
    if (!this.props.profile[0] || this.props.profile[0] === undefined) {

    } else {
      return (
        <View style={{ flexDirection: 'row', padding: 20, marginBottom: 10, marginTop: 10 }}>
          <View style={styles.profileContainer}>
            <ProfilePictureHandeler />
          </View>

          <View style={styles.profileDataContainer}>
            <View style={{ flexDirection: 'row', width: 100 }}>
              <Text style={styles.profileDataSettings} >{this.props.profile[0].name} {this.props.profile[0].age}
              </Text>
            </View>

          </View>
        </View>
      )
    }
  }
      /*
 If the current user has no location or it´s not yet loaded, render a location icon
 else render the location.
 */

  renderLocation () {
    if (!this.props.profile[0] || this.props.profile[0] === undefined) {
      return (
        <View style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)', borderBottomRightRadius: 11, borderTopRightRadius: 11, width: 107, justifyContent: 'center', alignItems: 'center' }}>
          <Icon
            name='place'
            type='place'
            color='#FFF'
            size={25}
            iconStyle={{ marginTop: 15 }}
          />
          <Text style={{ color: 'white', marginTop: 5, marginBottom: 15 }}> Location </Text>
        </View>
      )
    } else {
      return (
        <View style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)', borderBottomRightRadius: 11, borderTopRightRadius: 11, width: 107, justifyContent: 'center', alignItems: 'center' }}>
          <Icon
            name='place'
            type='place'
            color='#FFF'
            size={25}
            iconStyle={{ marginTop: 15 }}
          />
          <Text style={{ color: 'white', marginTop: 5, marginBottom: 15, textAlign: 'center' }}> {this.props.profile[0].position} </Text>
        </View>
      )
    }
  }

  /*
 If the current user has no description text or it´s not yet loaded, render a default text
 else render the description text
 */

  renderDescritptionText () {
    if (!this.props.profile[0] || this.props.profile[0].descriptionText === undefined) {
      return (
        <View>
          <Text style={{ color: 'white', fontSize: 20, textAlign: 'center', fontFamily: 'GeosansLight', justifyContent: 'center', alignItems: 'center' }}
          >"Write something about yourself..."</Text>

        </View>
      )
    } else {
      return (
        <View>
          <View style={{ justifyContent: 'center', alignContent: 'center' }}>
            <Text style={{ color: '#FFF', fontSize: 20, textAlign: 'center', fontFamily: 'GeosansLight', justifyContent: 'center', alignItems: 'center' }}>
              "{this.props.profile[0].descriptionText}"
            </Text>
          </View>
        </View>
      )
    }
  }

  renderModalBox () {
    if (!this.props.profile[0] || this.props.profile[0].descriptionText === undefined) {
      return (
        <ModalBox style={[styles.modal, styles.modalStyle]} position={'center'} ref={'modal1'} >
          <View style={styles.inputContainer}>
            <TextInput
              maxLength={41}
              placeholder='"Tell people something funny"'
              placeholderTextColor='black'
              returnKeyType='done'
              onChangeText={this.descriptionText.bind(this)}
              style={{ color: 'white', marginTop: 20, fontSize: 20, textAlign: 'center', fontFamily: 'GeosansLight', justifyContent: 'center', alignItems: 'center' }}
            />
          </View>
          <Button
            icon={<Icon name='account-plus' type='material-community' size={20} color='white' />}
            title='Save'
            titleStyle={{ fontFamily: 'GeosansLight' }}
            buttonStyle={styles.modalButtonSave}
            onPress={this.onButtonPress.bind(this)} />
        </ModalBox>
      )
    } else {
      return (

        <ModalBox style={[styles.modal, styles.modalStyle]} position={'center'} ref={'modal1'} >
          <View style={styles.inputContainer}>
            <TextInput
              maxLength={41}
              placeholder={this.props.profile[0].descriptionText}
              value={this.props.profile[0].descriptionText}
              placeholderTextColor='white'
              returnKeyType='next'
              multiline
              onChangeText={this.descriptionText.bind(this)}
              style={styles.texts} />
            <View style={styles.hairline} />
          </View>

          <Button
            icon={<Icon name='account-plus' type='material-community' size={20} color='white' />}
            title='Save'
            titleStyle={{ fontFamily: 'GeosansLight' }}

            buttonStyle={styles.modalButtonSave}
            onPress={this.onButtonPress.bind(this)} />
        </ModalBox>
      )
    }
  }

  renderMoodPicker () {
    if (!this.props.profile[0] || this.props.profile[0] === undefined) {
      return (
        <Spinner size='large' />
      )
    } else {
      return (
        <View style={styles.changeStatusButtonContainer}>

          <Text style={styles.currentMoodStyle} > Current Mood : </Text>
          <Picker
            selectedValue={this.props.profile[0].value}
            onValueChange={value => this.currentMood(value)}
            itemStyle={{ height: 140, fontSize: 20, color: 'white', fontFamily: 'GeosansLight', marginBottom: 10, marginLeft: 20 }}
            style={{ width: 190, height: 80, marginBottom: 60 }}>
            <Picker.Item label='💃 Dancing' value='💃 Dancing' />
            <Picker.Item label='🎶 Listening To Music' value='🎶 Listening To Music' />
            <Picker.Item label='🔥 Feeling On Fire' value='🔥 Feeling On Fire' />
            <Picker.Item label='😴 Feeling Tired' value='😴 Feeling Tired' />
            <Picker.Item label='🤪 Feeling Crazy' value='🤪 Feeling Crazy' />
            <Picker.Item label='🤔 Feeling Confused' value='🤔 Feeling Confused' />
            <Picker.Item label='🍻 Drinking Beer' value='🍻 Drinking Beer' />
            <Picker.Item label='🍷 Drinking Wine' value='🍷 Drinking Wine' />
            <Picker.Item label='🍕 Pizza Time' value='🍕 Pizza Time' />
          </Picker>
        </View>
      )
    }
  }

  render () {
    return (
      <Modal
        isVisible={this.props.toggleHeaderModal === true}
        onSwipe={() => this.props.toggleOffHeaderModal({toggleHeaderModal: false})}
        swipeDirection='up'
        onSwipeThreshold={50}
        backdropOpacity={0.90}
        animationIn='slideInDown'
        animationInTiming={270}>

        <View style={{flex: 1}}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <View>
              <Icon
                name='close'
                type='close'
                color='#FFF'
                onPress={this.toggleModal.bind(this)}
                />
            </View>

            <Icon
              name='cog'
              type='font-awesome'
              color='#FFF'
              onPress={() => this.accountSettings()}
              />
          </View>

          {/* Renders profile avatar-mood and location */}

          <View style={{ flexDirection: 'row', padding: 20, marginBottom: 10, marginTop: 10 }}>
            <View style={styles.profileContainer}>
              <ProfilePictureHandeler />
            </View>

            <View style={styles.profileDataContainer}>
              <View style={{ flexDirection: 'row', width: 100 }}>
                <Text style={styles.profileDataSettings} >{this.props.profile[0].name} {this.props.profile[0].age}
                </Text>
              </View>

            </View>
          </View>

          <View style={styles.iconsInModal}>

            {/* Message icon - renders chatlist onPress */}

            <TouchableOpacity
              onPress={() => this.goToChatList()}
              style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)', borderBottomLeftRadius: 11, borderTopLeftRadius: 11, width: 107, justifyContent: 'center', alignItems: 'center' }}>
              <Icon
                name='message'
                type='message'
                color='#FFF'
                size={25}
                iconStyle={{ marginTop: 15 }}
                />
                />
              <Text style={{ color: 'white', marginTop: 4, marginBottom: 15 }}>Messages</Text>

            </TouchableOpacity>

            {/* Changes icon - renders selectStatus onPress */}
            <TouchableOpacity
              onPress={this.changeStatus.bind(this)}
              style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)', width: 117, justifyContent: 'center', alignItems: 'center' }}>
              <Icon
                name='replay'
                type='replay'
                color='#FFF'
                size={25}
                />
              <Text style={{ color: 'white', marginTop: 5 }}> Change Status </Text>
            </TouchableOpacity>

            {/* Renders location */}

            {this.renderLocation()}
          </View>

          {/* Description Text */}
          <TouchableOpacity onPress={() => this.refs.modal1.open()} style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)', marginTop: 10, borderRadius: 11, flex: 1, padding: 10, justifyContent: 'center', alignContent: 'center' }}>
            {this.renderDescritptionText()}
          </TouchableOpacity >

          {this.renderModalBox()}

          {/* Mood Picker */}

          {this.renderMoodPicker()}
        </View>

      </Modal>
    )
  }
}

const mapStateToProps = state => {
  const profile = _.map(state.profile, (val) => {
    return { ...val }
  })

  const { toggle, toggleHeaderModal } = state.toggle
  const { moode } = state.moode

  return {
    toggle,
    toggleHeaderModal,
    profile,
    moode,
    descriptionText: state.accountsettings.descriptionText
  }
}

export default connect(mapStateToProps, { fetchProfileData, signOut, currentMood, descriptionTextChanged, updateDescriptionText, toggleOn, toggleOff, toggleOnHeaderModal, toggleOffHeaderModal})(ProfileModal)
