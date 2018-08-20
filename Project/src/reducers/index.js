import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import CreateProfileReducer from './CreateProfileReducer'
import SetStatusReducer from './SetStatusReducer'
import ListReducer from './ListReducer'
import DistanceReducer from './DistanceReducer'
import CurrentProfileReducer from './CurrentProfileReducer'
import CurrentModeReducer from './CurrentModeReducer'
import GenderReducer from './GenderReducer'
import DescriptionReducer from './DescriptionReducer'
import AccountSettingsReducer from './AccountSettingsReducer'
import ToggleReducer from './ToggleReducer'
import ModalDataReducer from './ModalDataReducer'
/*
Reducers watch for an action and then updates the state with the new payload
*/

export default combineReducers({
  auth: AuthReducer,
  create: CreateProfileReducer,
  status: SetStatusReducer,
  list: ListReducer,
  distance: DistanceReducer,
  profile: CurrentProfileReducer,
  moode: CurrentModeReducer,
  gender: GenderReducer,
  descriptionText: DescriptionReducer,
  accountsettings: AccountSettingsReducer,
  toggle: ToggleReducer,
  modalData: ModalDataReducer
})
