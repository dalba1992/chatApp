import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleOffProfilemodal, toggleOnProfilemodal, updateModalData } from '../../actions'
import { View, Text, TouchableOpacity, Picker } from 'react-native'
import { Avatar } from 'react-native-elements'
import styles from './ListUserItem.style'
import ProfileInlistModal from '../ProfileInListModal/ProfileInListModal'

class ListUserItem extends Component {
  /*
  toggle if to show modal or not
  */

  toggleModal () {
    if (this.props.toggleProfileModal === true) {
      return (
        <ProfileInlistModal />
      )
    }
  }

    /*
  set toggle to true to show render modal &
  take the current user that´s clicked and update it to modalData
  */

  onButtonPress (user) {
    
    this.props.toggleOnProfilemodal({toggleProfileModal: true})
    this.props.updateModalData({modalData: user})
  }

  render (user) {
    return (
      <View>
    
       {/* Users in the list */}

        <TouchableOpacity
          onPress={this.onButtonPress.bind(this, this.props.user)}
          style={styles.container}>
          <Avatar
            imageProps={{ resizeMode: 'cover' }}
            size='large'
            rounded
            source={{ uri: this.props.user.profile_picture }}
            avatarStyle={{ borderColor: '#302F30', borderWidth: 1 }}
            activeOpacity={0.7}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {this.props.user.name} {this.props.user.age}
            </Text>
          </View>

          <View style={styles.textContainer2}>
            <Text style={styles.text}>
              <Text>
                {this.props.user.mood} {this.props.user.value}
              </Text>
            </Text>
          </View>
        </TouchableOpacity>

        {/* Modal when a user click on the profile in list */}

        {this.toggleModal()}

      </View>
    )
  }
}

const mapStateToProps = state => {
  const { toggleProfileModal } = state.toggle

  return {
    toggleProfileModal
  }
}

export default connect(mapStateToProps, { toggleOffProfilemodal, toggleOnProfilemodal, updateModalData })(ListUserItem)
