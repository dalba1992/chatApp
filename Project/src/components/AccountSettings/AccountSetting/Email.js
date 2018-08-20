import React, { Component } from 'react'
import { View, TextInput, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { emailChangedEdit, updateEmails, toggleOff, toggleOn, fetchProfileData } from '../../../actions'

import styles from '../AccountSettings.style'

class Email extends Component {
  onChangeText (text) {
    if (this.props.data.email !== text) {
      this.props.toggleOn({ toggle: true })
      this.props.emailChangedEdit(text)
    } else if (this.props.data.email === text) {
      this.props.toggleOff({ toggle: false })
    }
  }

  onButtonPress () {
    const { email } = this.props
    this.props.updateEmails({ email })
    this.props.fetchProfileData()
  }

  renderButton () {
    if (this.props.toggle === true) {
      return <Button onPress={this.onButtonPress.bind(this)} title='Save' />
    }
  }

  render () {
    return (
      <View>
        <View style={styles.headerCenterContainer}>
          <Text style={styles.headerCenterText}>
            This is your registered email
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <TextInput
            placeholder='Email'
            placeholderTextColor='black'
            style={styles.propertyText}
            value={this.props.data.email}
            onChangeText={text => this.onChangeText(text)}
          />
        </View>
        {this.renderButton()}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    email: state.accountsettings.email,
    toggle: state.toggle.toggle
  }
}

export default connect(mapStateToProps, { emailChangedEdit, updateEmails, toggleOff, toggleOn, fetchProfileData })(Email)
