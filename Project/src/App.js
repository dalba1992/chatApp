import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import ReduxThunk from 'redux-thunk'
import Router from './Router'
/*
Starting point of the application.
Creating redux store & Routing.
*/

class App extends Component {
  render () {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
    return (
      <Provider store={store}>

        <Router />

      </Provider>
    )
  }
}

export default App
