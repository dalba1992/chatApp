import React, { Component } from 'react'
import { View } from 'react-native'
import { Header, Icon, Avatar } from 'react-native-elements'
import _ from 'lodash'
import { Actions } from 'react-native-router-flux'
import { fetchProfileData, signOut, currentMood, descriptionTextChanged, updateDescriptionText, toggleOnHeaderModal } from '../../actions'
import { connect } from 'react-redux'
import { Spinner } from '../common'

import ProfileModal from '../ProfileModal/ProfileModal'

class HeaderBlack extends Component {
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

  toggleModal () {
    if (this.props.toggleHeaderModal === true) {
      return (
        <ProfileModal />
      )
    }
  }

  onButtonPress () {
    this.props.toggleOnHeaderModal({toggleHeaderModal: true})
  }

  /*
  If the current user has no profile picture or it´s not yet loaded, render a spinner
  else render the profile picture as avatar in the header
  */

  renderHeader () {
    if (!this.props.profile[0] || this.props.profile[0] === undefined) {
      return <Header
        style={{ padding: 0 }}
        backgroundColor='#1E1E1E'
        outerContainerStyles={{ height: 120 }}
        leftComponent={<Spinner size='small' />}
        centerComponent={{ text: 'People Online ', style: { color: '#fff', fontFamily: 'GeosansLight', fontSize: 24 } }}
        rightComponent={{ icon: 'forum', color: '#fff' }}
      />
    } else {
      return <Header
        style={{ padding: 0 }}
        backgroundColor='#1E1E1E'
        outerContainerStyles={{ height: 120 }}
        leftComponent={<Avatar
          size='medium'
          rounded
          source={{ uri: this.props.profile[0].profile_picture }}
          onPress={this.onButtonPress.bind(this)}
          avatarStyle={{ borderColor: 'white', borderWidth: 1 }}
        />}
        centerComponent={{ text: 'People Onlinet ', style: { color: '#fff', fontFamily: 'GeosansLight', fontSize: 24 } }}
        rightComponent={
          <Icon
            name='forum'
            color='white'
            onPress={() => Actions.chatList({ data: this.props.profile })} />
        }
      />
    }
  }

  render () {
    return (
      <View>
        <View>

          {/* Header */}
          {this.renderHeader()}

          {this.toggleModal()}

        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  const profile = _.map(state.profile, (val) => {
    return { ...val }
  })

  const { moode } = state.moode

  const { toggleHeaderModal } = state.toggle

  return {
    profile,
    moode,
    descriptionText: state.accountsettings.descriptionText,
    toggleHeaderModal
  }
}

export default connect(mapStateToProps, { fetchProfileData, signOut, currentMood, descriptionTextChanged, updateDescriptionText, toggleOnHeaderModal })(HeaderBlack)
