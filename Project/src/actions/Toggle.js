import {

  TOGGLE_ON,
  TOGGLE_OFF,
  TOGGLE_ON_PROFILEMODAL_IN_LIST,
  TOGGLE_OFF_PROFILEMODAL_IN_LIST,
  TOGGLE_ON_HEADERMODAL,
  TOGGLE_OFF_HEADERMODAL

} from './types'

export const toggleOn = ({ toggle }) => {
  return (dispatch) => {
    dispatch({ type: TOGGLE_ON })
  }
}

export const toggleOff = ({ toggle }) => {
  return (dispatch) => {
    dispatch({ type: TOGGLE_OFF })
  }
}

export const toggleOnProfilemodal = ({ toggleProfileModal }) => {
  return (dispatch) => {
    dispatch({ type: TOGGLE_ON_PROFILEMODAL_IN_LIST })
  }
}
export const toggleOffProfilemodal = ({ toggleProfileModal }) => {
  return (dispatch) => {
    dispatch({ type: TOGGLE_OFF_PROFILEMODAL_IN_LIST })
  }
}

export const toggleOnHeaderModal = ({ toggleHeaderModal }) => {
  return (dispatch) => {
    dispatch({ type: TOGGLE_ON_HEADERMODAL })
  }
}

export const toggleOffHeaderModal = ({ toggleHeaderModal }) => {
  return (dispatch) => {
    dispatch({ type: TOGGLE_OFF_HEADERMODAL })
  }
}
