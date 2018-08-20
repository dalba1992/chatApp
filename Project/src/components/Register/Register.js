import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { Text, View, TextInput, KeyboardAvoidingView, Keyboard } from 'react-native'
import { Spinner } from '../common'
import { connect } from 'react-redux'
import { emailChanged, passwordChanged, registerUser } from '../../actions'
import { Tile, Button, Icon } from 'react-native-elements'

import styles from './Register.style'

class Register extends Component {
  // when user write something, create a action creator

  onEmailChange (text) {
    this.props.emailChanged(text)
    console.log(this.props.email)
  }

  onPasswordChange (text) {
    this.props.passwordChanged(text)
    console.log(this.props.password)
  }

  // Try to log  in with email and password
  onButtonPress () {
    const {email, password} = this.props
    this.props.registerUser({email, password})
    Keyboard.dismiss()
  }

  // If auth fails, shows an error messagethisssss
  renderError () {
    if (this.props.error) {
      return (
        <View>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      )
    }
  }

  renderLogInScreen () {
    Actions.login()
  }
  // If the state is "loading" show the spinner, else show the button
  renderButton () {
    if (this.props.loading) {
      return <Spinner size='large' />
    }
    return (
      <Button
        icon={
          <Icon
            name='account-plus'
            type='material-community'
            size={20}
            color='white'
/>
}
        title='Register'
        titleStyle={{ fontFamily: 'GeosansLight'}}
        buttonStyle={{
          backgroundColor: '#D1AF46',
        // backgroundColor: '#2C4D69',
          width: 250,
          height: 40,
          marginLeft: 45,
          borderColor: 'transparent',
          borderWidth: 0,
          borderRadius: 5

        }}
        onPress={this.onButtonPress.bind(this)}
/>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Tile
            imageSrc={require('../../assets/registerback.jpg')}
            imageContainerStyle={{ }}
            title='Register.'
            activeOpacity={1}
            onPress={() => Keyboard.dismiss()}
            featured
            caption=''
            captionStyle={{ fontFamily: 'GeosansLight'
            }}
            titleStyle={{fontFamily: 'Meatbuckets', fontSize: 55, justifyContent: 'center', alignItems: 'center'}}
            height={1200}
/>
        </View>
        <KeyboardAvoidingView behavior='padding' style={styles.inputContainer}>
          <TextInput
            placeholder='Email'
            placeholderTextColor='white'
            returnKeyType='next'
            keyboardType='email-address'
            value={this.props.email}
            onChangeText={this.onEmailChange.bind(this)}
            style={styles.texts}
      />
          <View style={styles.hairline} />
          <TextInput
            placeholder='Password'
            placeholderTextColor='white'
            returnKeyType='go'
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
            secureTextEntry
            style={styles.texts}

      />

          <View style={styles.hairline} />
          <View style={{marginBottom: 40}}>
            {this.renderError()}
          </View>

          <View style={styles.spinnerAndButton}>
            {this.renderButton()}
          </View>
        </KeyboardAvoidingView>

        <Text style={styles.descriptionText}
          onPress={this.renderLogInScreen.bind(this)}
          >
        Already have a account ? <Text style={{ textDecorationLine: 'underline'}}>Sign in here.</Text>
        </Text>
      </View>
    )
  }
}

// state to component
const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading
  }
}
export default connect(mapStateToProps, { emailChanged, passwordChanged, registerUser})(Register)
