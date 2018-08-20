import React, { Component } from 'react'
import { View, TextInput, Text, Keyboard } from 'react-native'
import { Button } from 'react-native-elements'
import styles from '../AccountSettings.style'
import { connect } from 'react-redux'
import { nameChangedEdit, updateProfileName, toggleOff, toggleOn, fetchProfileData} from '../../../actions'

class Name extends Component {
  onChangeText (text) {
    if (this.props.data.name !== text) {
      this.props.toggleOn({toggle: true})
      this.props.nameChangedEdit(text)
    } else if (this.props.data.name === text) {
      this.props.toggleOff({toggle: false})
    }
  }

  onButtonPress () {
    const { name } = this.props
    this.props.updateProfileName({name})
    this.props.fetchProfileData()
    Keyboard.dismiss()
  }

  // Render Button if the value changes

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
            Enter your name
            <Text style={styles.bracketsText}>
            (this will be displayed in your profile)
            </Text>
          </Text>
        </View>
        <View style={styles.rowContainer}>
          <TextInput
            placeholder='Name'
            placeholderTextColor='black'
            style={styles.propertyText}
            value={this.props.data.name}
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
    name: state.accountsettings.name,
    toggle: state.toggle.toggle
  }
}

export default connect(mapStateToProps, { nameChangedEdit, updateProfileName, toggleOff, toggleOn, fetchProfileData})(Name)
