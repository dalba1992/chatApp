import React from 'react'
import { Router, Scene, Actions } from 'react-native-router-flux'
import LoginForm from './components/LogIn/LogInForm'
import CreateProfile from './components/CreateProfile/createProfile'
import SelectStatus from './components/SelectStatus/SelectStatus'
import Register from './components/Register/Register'
import OnlineList from './components/OnlineList/OnlineList'
import Chat from './components/Chatt/Chat'
import ChatList from './components/ChatList/ChatList'
import AccountSettings from './components/AccountSettings/AccountSettings'
import Name from './components/AccountSettings/AccountSetting/Name'
import Email from './components/AccountSettings/AccountSetting/Email'

/*
Handles the routing of the application.
*/

const RouterComponent = () => {
  return (
    <Router >
      <Scene key='root' hideNavBar >
        <Scene key='auth'>
          <Scene key='login' component={LoginForm} hideNavBar />
          <Scene key='register' component={Register} hideNavBar />
        </Scene>

        <Scene key='profile'>
          <Scene
            key='createProfile'
            component={CreateProfile}
            hideNavBar
          />
        </Scene>
        <Scene key='main'>
          <Scene
            key='selectStatus'
            component={SelectStatus}
            hideNavBar
          />
          <Scene
            hideNavBar
            key='goingOut'
            component={OnlineList}
          />
          <Scene
            onLeft={() => Actions.selectStatus()}
            leftTitle='Change Status'
            key='notGoingOut'
            navTransparent
            component={ChatList}
          />
          <Scene
            key='chat'
            component={Chat}
            hideNavBar
            title='Chat'
            barButtonIconStyle={{ tintColor: 'black' }}
            titleStyle={{ color: 'white', fontFamily: 'GeosansLight', fontSize: 30 }}
          />
          <Scene
            key='chatList'
            component={ChatList}
            hideNavBar
            title='Chat List'
            titleStyle={{ color: 'white', fontFamily: 'GeosansLight', fontSize: 30 }}
          />
        </Scene>

        <Scene
          hideNavBar
          tintColor='black'
          onLeft={() => Actions.push('goingOut')}
          title='Account Settings'
          key='accountSettings'
          component={AccountSettings}
        />
        <Scene
          tintColor='black'
          onLeft={() => Actions.AccountSettings()}
          key='name'
          title='Name'
          component={Name}
        />
        <Scene
          tintColor='black'
          onLeft={() => Actions.AccountSettings()}
          key='email'
          title='Email'
          component={Email}
        />

      </Scene>

    </Router>
  )
}

export default RouterComponent
