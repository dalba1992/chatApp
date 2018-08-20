import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Avatar, Icon, Button } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { toggleOffProfilemodal, toggleOnProfilemodal } from '../../actions'

import Modal from 'react-native-modal'

import styles from './ProfileInListModal.style'

class ProfileInListModal extends Component {
  /*
  toggle if to show modal or not
  */

  toggleModal () {
    this.props.toggleOffProfilemodal({toggleProfileModal: false})
  }

  /*
 Pass data to chatScren & toggel off the modal
  */

  startchat () {
    Actions.chat({ data: this.props.modalData.modalData })
    this.props.toggleOffProfilemodal({toggle: false})
  }

  renderDescriptionText () {
    if (this.props.modalData.modalData.descriptionText === undefined) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.text4}>About {this.props.modalData.modalData.name}</Text>

          <Text style={styles.text3}>
            "{this.props.modalData.modalData.name} has not yet done any description"
            </Text>
        </View>
      )
    } else {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.text4}>About {this.props.modalData.modalData.name}</Text>
          <Text style={styles.text3}>
            "{this.props.modalData.modalData.descriptionText}"
          </Text>
        </View>
      )
    }
  }

  render (user) {
    return (
      <Modal
        isVisible={this.props.toggleProfileModal === true}
        onSwipe={() => this.props.toggleOffProfilemodal({toggle: false})}
        swipeDirection='up'
        onSwipeThreshold={50}
        backdropOpacity={0.9}
        animationIn='slideInDown'
        animationInTiming={270}
      >

        <View style={{flex: 1}}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.exitModalIcon}>
              <Icon
                name='close'
                type='close'
                color='#FFF'
                onPress={this.toggleModal.bind(this)}
                />
            </View>
          </View>

          <View style={{flexDirection: 'row', padding: 10}}>

            <View style={styles.profileContainer}>
              <Avatar
                size={210}
                rounded
                source={{ uri: this.props.modalData.modalData.profile_picture }}
                activeOpacity={0.7}
                avatarStyle={{ borderColor: '#302F30', borderWidth: 1 }}
/>
            </View>

            <View style={styles.profileDataContainer}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.profileDataSettings} >{this.props.modalData.modalData.name} {this.props.modalData.modalData.age}</Text>
              </View>

              <View style={styles.profileDataPosition}>
                <Text style={styles.profileDataSettings2} >
                  {this.props.modalData.modalData.position}
                </Text>
              </View>

              <View style={styles.editProfileDataSettingsContainer}>
                <Text style={styles.editProfileDataSettings}>{this.props.modalData.modalData.value} </Text>
              </View>

            </View>
          </View>

          <View style={{
            height: 250,
            marginBottom: 70,
            marginTop: 20,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
            borderRadius: 11
          }}>

            <Text style={styles.text3}>
              {this.renderDescriptionText()}
            </Text>

          </View>

          <View style={styles.changeStatusButtonContainer} >

            <Button
              icon={
                <Icon
                  name='message-plus'
                  type='material-community'
                  size={20}
                  color='white'
                    />
                  }
              title='Send a message'
              titleStyle={{ fontFamily: 'GeosansLight' }}
              onPress={this.startchat.bind(this)}
              buttonStyle={{
                backgroundColor: '#D1AF46',
                width: 300,
                height: 45,
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 5
              }}
                />
          </View>
        </View>
      </Modal>

    )
  }
}

const mapStateToProps = state => {
  const { toggleProfileModal } = state.toggle
  const { modalData } = state.modalData

  return {
    toggleProfileModal,
    modalData
  }
}

export default connect(mapStateToProps, { toggleOnProfilemodal, toggleOffProfilemodal })(ProfileInListModal)
