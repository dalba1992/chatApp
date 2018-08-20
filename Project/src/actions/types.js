/*
All of the actions types in veribales for reducers and actions
*/

// Auth
export const EMAIL_CHANGED = 'email_changed'
export const PASSWORD_CHANGED = 'password_changed'
export const LOGIN_USER_SUCESS = 'login_user_sucess'
export const LOGIN_USER_FAIL = 'login_user_fail'
export const LOGIN_USER = 'login_user'
export const REGISTER_USER = 'register_user'
export const DELETE_ERROR = 'delete_error'
export const SIGN_OUT = 'sign_out'
// Create Profile
export const FIRST_NAME_CHANGED = 'first_name_changed'
export const SECOND_NAME_CHANGED = 'second_name_changed'
export const AGE_CHANGED = 'age_changed'
export const GENDER_CHANGED = 'gender_changed'

export const CREATE_PROFILE = 'create_profile'
export const PROFILE_UPDATE = 'profile_update'
export const CREATE_PROFILE_SUCCESS = 'create_profile_success'

// Edit Profile
export const EDIT_NAME_CHANGED = 'edit_name_changed'
export const EDIT_AGE_CHANGED = 'edit_age_changed'
export const EDIT_PROFILE = 'edit_profile'
// Status
export const SET_STATUS_TO_OUT = 'set_status_to_out'
export const SET_STATUS_TO_NOT_OUT = 'set_status_to_not_out'
export const UPDATE_CURRENT_MODE = 'update_current_mode'

// LIST
export const UPDATE_LIST_SUCCESS = 'update_list_success'

export const DISTANCE_CHANGED = 'update_list_distance'

// Profile Data
export const CURRENT_PROFILE_DATA = 'current_profile_data'
export const GET_LOCATION = 'get_location'

export const DESCRIPTION_TEXT_CHANGED = 'description_text_changed'
export const ADD_DESCRIPTION_TEXT = 'add_description_text'

// ACCOUNT SETTINGS REDUCER
export const WORK_CHANGED = 'work_changed'
export const ADD_WORK = 'add_work'

export const EDUCATION_CHANGED = 'education_changed'
export const ADD_EDUCATION = 'add_education'

export const HOBBY_CHANGED = 'hobby_changed'
export const ADD_HOBBY = 'add_hobby'

export const FAVORITE_PLACE_CHANGED = 'favorite_place_changed'
export const ADD_FAVORITE_PLACE = 'add_favorite_place'

export const EMAIL_UPDATED = 'email_updated'
export const ADD_EMAIL = 'add_email'

// TOGGELS
export const TOGGLE_ON = 'toggle_on'
export const TOGGLE_OFF = 'toggle_off'

export const TOGGLE_ON_PROFILEMODAL_IN_LIST = 'toggle_on_profilemodal_in_list'
export const TOGGLE_OFF_PROFILEMODAL_IN_LIST = 'toggle_off_profilemodal_in_list'

export const TOGGLE_ON_HEADERMODAL = 'toggle_on_headermodal'
export const TOGGLE_OFF_HEADERMODAL = 'toggle_off_headermodal'

export const UPDATE_MODAL_DATA = 'update_modal_data'
