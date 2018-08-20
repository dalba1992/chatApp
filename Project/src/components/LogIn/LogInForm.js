import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { Text, View, TextInput, KeyboardAvoidingView, Keyboard, Image } from 'react-native'
import { Spinner } from '../common'
import { connect } from 'react-redux'
import { emailChanged, passwordChanged, loginUser, deleteErrorMessage } from '../../actions'
import { Tile, Button, Icon } from 'react-native-elements'
import Modal from 'react-native-modal'


// StyleSheet
import styles from './LogInForm.style'
import { firebaseRef } from '../../firebase/firebase'

class LogInForm extends Component {
  constructor () {
    super()
    this.state = {
      isModalVisible: false,
      email: ''
    }
  }

  // toggle if to show modal or not
  toggleModal () {
    this.setState({ isModalVisible: !this.state.isModalVisible })
    this.props.deleteErrorMessage()
  }


  componentWillUnmount () {
    // prevent leaking
    this.refreshUnsubscribe()
    this.notificationUnsubscribe()
  }

  // when user write something, create a action creator
  onEmailChange (text) {
    this.props.emailChanged(text)
  }

  onPasswordChange (text) {
    this.props.passwordChanged(text)
  }

  // Try to log  in with email and password
  onButtonPress () {
    const { email, password } = this.props

    this.props.loginUser({ email, password })
    Keyboard.dismiss()
  }

  // Send a resetlink to the email that is provided.
  onButtonPress2 (email) {
    var that = this

    let emailToResetPassword = this.state.email
    firebaseRef.auth().sendPasswordResetEmail(emailToResetPassword).then(function (user) {
      console.log('A Password Reset has been send to the provided email')
    }).then(function () {
      // close modal & delete error messages
      that.toggleModal()
      this.props.deleteErrorMessage()
    }).catch(function (error) {
      console.log(error)
      that.errorSendNewPassword(error)
    })
  }

  // If auth fails, shows an error message

  renderError () {
    if (this.props.error) {
      return (
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>

          <Text style={styles.errorTextStyleForgottPassword} onPress={this.toggleModal.bind(this)}>
            Forgot password ?<Text style={{ textDecorationLine: 'underline' }}> Click here.</Text>
          </Text>
        </View>
      )
    }
  }

  renderRegisterScreen () {
    Actions.register()
    this.props.deleteErrorMessage()
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
            name='check-circle-outline'
            type='material-community'
            size={20}
            color='white'
          />
        }
        title='Log In'
        titleStyle={{ fontFamily: 'GeosansLight' }}
        buttonStyle={{
          backgroundColor: '#D1AF46',
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
            imageSrc={require('../../assets/loginback2.jpg')}
            imageContainerStyle={{}}
            title='App Name?'
            activeOpacity={1}
            featured
            onPress={() => Keyboard.dismiss()}
            caption='Message app'
            captionStyle={{
              fontFamily: 'GeosansLight'
            }}
            titleStyle={{ fontFamily: 'Meatbuckets', fontSize: 55, justifyContent: 'center', alignItems: 'center' }}
            icon={{ name: 'zoom-in', color: 'white', size: 50 }}
            height={1200}
          />

          {/* Forgot password modal */}

          <Modal isVisible={this.state.isModalVisible}
            onSwipe={() => this.setState({ isModalVisible: false })}
            swipeDirection='up'
            onSwipeThreshold={50}
            backdropOpacity={0.95}
            animationIn='slideInDown'
            animationInTiming={270}
          >

            <View style={{ flex: 1, flexDirection: 'row' }}>
              <KeyboardAvoidingView behavior='position' contentContainerStyle={{ marginTop: 30 }}
                style={styles.inputContainer} >

                <View style={{ marginTop: 0 }}>
                  <View style={styles.exitModalIcon}>
                    <Icon
                      name='clear'
                      type='clear'
                      color='#FFF'
                      onPress={this.toggleModal.bind(this)}
                    />
                  </View>

                  <Text style={{ marginTop: 50, marginLeft: 28, fontFamily: 'GeosansLight', fontSize: 45, justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                    Forgot Password ?
                </Text>

                  <Image
                    style={{ width: 145, height: 145, marginTop: 100, marginBottom: 60, marginLeft: 95 }}
                    source={require('../../assets/mail.png')}

                  />

                  <Text style={{ marginBottom: 80, marginLeft: 30, fontFamily: 'GeosansLight', fontSize: 15, justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                    No worries, just enter your email & get a new one !
                </Text>

                  <TextInput
                    placeholder='Email'
                    placeholderTextColor='white'
                    returnKeyType='next'
                    keyboardType='email-address'
                    style={styles.texts2}
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                  />

                  <View style={styles.hairline2} />

                  <View>
                    <Button
                      icon={
                        <Icon
                          name='check-circle-outline'
                          type='material-community'
                          size={20}
                          color='white'
                        />
                      }
                      title='Send New Password'
                      titleStyle={{ fontFamily: 'GeosansLight' }}
                      buttonStyle={{
                        backgroundColor: '#D1AF46',
                        width: 250,
                        height: 40,
                        marginLeft: 45,
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 5

                      }}
                      onPress={this.onButtonPress2.bind(this)}
                    />
                  </View>
                </View>
              </KeyboardAvoidingView>

            </View>
          </Modal>
        </View>

        <KeyboardAvoidingView behavior='padding' style={styles.inputContainer}>

          {!this.state.is_registered && <TextInput
            placeholder='Email'
            placeholderTextColor='white'
            returnKeyType='next'
            keyboardType='email-address'
            onChangeText={this.onEmailChange.bind(this)}
            style={styles.texts}
          />

         }
          {!this.state.is_registered && <View style={styles.hairline} />}

          {!this.state.is_registered && <TextInput
            placeholder='Password'
            placeholderTextColor='white'
            returnKeyType='go'
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
            secureTextEntry
            style={styles.texts}
          />
           }

          {!this.state.is_registered && <View style={styles.hairline} />}

          <View style={{ marginBottom: 40 }}>
            {this.renderError()}
          </View>

          <View style={styles.spinnerAndButton}>
            {this.renderButton()}
          </View>

        </KeyboardAvoidingView>

        <Text style={styles.descriptionText} onPress={this.renderRegisterScreen.bind(this)}>
          Not a account ? <Text style={{ textDecorationLine: 'underline' }}>Register here.</Text>
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
export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser, deleteErrorMessage })(LogInForm)

// connect the component to redux
// passes mapsettoprop and second the action creator
