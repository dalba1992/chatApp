import {
    UPDATE_MODAL_DATA
} from './types'

/*
Sets the current mood to current user in firebase.
*/
export const updateModalData = ({ modalData }) => {
  console.log(modalData)
  return (dispatch) => {
    dispatch({ type: UPDATE_MODAL_DATA,
      payload: { modalData } })
  }
}
