import React, {Component} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './AccountSettings.style'
import {Icon, Header} from 'react-native-elements'
import {Actions} from 'react-native-router-flux'
import { signOut, fetchProfileData, toggleOnHeaderModal } from '../../actions'
import { connect } from 'react-redux'
import _ from 'lodash'

class AccountSettings extends Component {
     /*
  Fetches the current profile data
   */
  componentWillMount () {
    this.props.fetchProfileData()
  }

    // Signs out the user and render login scene
  signOut () {
    this.props.signOut()
    Actions.login()
  }

  render () {
    return (

      <View>

        <Header
          style={{ padding: 0 }}
          outerContainerStyles={{height: 85}}
          backgroundColor='white'
          leftComponent={<Icon name='keyboard-arrow-left' size={35} onPress={() => Actions.pop() && this.props.toggleOnHeaderModal({toggleOnHeaderModal: true})} />
        }
          centerComponent={{ text: 'Account Settings ', style: { color: 'black', fontWeight: 'bold', fontSize: 16 } }}
      />

        <Text style={styles.containerHeaderText}> Account Setting </Text>
        <TouchableOpacity onPress={() => Actions.name({data: this.props.profile[0]})} style={styles.rowContainer}>
          <Text style={styles.propertyText}>Name </Text>
          <Text style={styles.valueText}> {this.props.profile[0].name} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.rowContainer}>
          <Text style={styles.propertyText}>Age </Text>
          <Text style={styles.valueText}> {this.props.profile[0].age} </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Actions.email({data: this.props.profile[0]})} style={styles.rowContainer}>
          <Text style={styles.propertyText}>Email </Text>
          <Text style={styles.valueText}> {this.props.profile[0].email} </Text>
        </TouchableOpacity>

        <Text style={styles.containerHeaderText}> Account Measures </Text>
        <TouchableOpacity onPress={() => this.signOut()} style={styles.rowContainer}>
          <Text style={styles.propertyText}>Log Out </Text>
          <Text style={styles.logOutIcon}>
            <Icon name='keyboard-arrow-right' />
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => {
  const profile = _.map(state.profile, (val) => {
    return {...val}
  })

  return { profile }
}

export default connect(mapStateToProps, { signOut, fetchProfileData, toggleOnHeaderModal })(AccountSettings)
