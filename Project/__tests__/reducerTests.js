import 'react-native'
import React from 'react'
import listReducer from '../src/reducers/ListReducer'
import authReducer from '../src/reducers/AuthReducer'
import createProfileReducer from '../src/reducers/CreateProfileReducer'
import currentMoodReducer from '../src/reducers/CurrentModeReducer'
import currenProfileReducer from '../src/reducers/CurrentProfileReducer'
import editProfileReducer from '../src/reducers/EditProfileReducer'
import genderReducer from '../src/reducers/GenderReducer'
import setStatusReducer from '../src/reducers/SetStatusReducer'

import allReducers from '../src/reducers/index'

import {mount} from 'enzyme'

import renderer from 'react-test-renderer'

describe('List Reducer', () => {
  it('Initial state should be an empty object', () => {
    expect(listReducer(undefined, {})).toEqual({})
  })
})

describe('Current Profile Reducer', () => {
  it('Initial state should be an empty object', () => {
    expect(currenProfileReducer(undefined, {})).toEqual({})
  })
})

describe('Auth Reducer', () => {
  it('Initial state should have email set to "", password to "" and loading to false', () => {
    expect(authReducer(undefined, {})).toEqual({
      email: '',
      password: '',
      loading: false
    })
  })
})

describe('Create Profile Reducer', () => {
  it('Initial state should have name set to "", age to "" and loading to false', () => {
    expect(createProfileReducer(undefined, {})).toEqual({
      name: '',
      age: '',
      loading: false
    })
  })
})

describe('Edit Profile Reducer', () => {
  it('Initial state should have name set to "", age to "" and loading to false', () => {
    expect(editProfileReducer(undefined, {})).toEqual({
      name: '',
      age: '',
      loading: false
    })
  })
})

describe('Current Mood Reducer', () => {
  it('Initial state should have mood set to "" ', () => {
    expect(currentMoodReducer(undefined, {})).toEqual({
      mood: ''
    })
  })
})

describe('Gender Reducer', () => {
  it('Initial state should have gender set to "" ', () => {
    expect(genderReducer(undefined, {})).toEqual({
      gender: ''
    })
  })
})

describe('Set Status Reducer', () => {
  it('Initial state should have status set to false ', () => {
    expect(setStatusReducer(undefined, {})).toEqual({
      status: false
    })
  })
})
