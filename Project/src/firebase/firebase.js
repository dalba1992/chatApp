import * as Firebase from 'firebase'

var config = {
  apiKey: "AIzaSyAu4VcCVxvxzwCOnCWhkl6Oqt51La9xQZw",
  authDomain: "fir-chatproject-6eeaf.firebaseapp.com",
  databaseURL: "https://fir-chatproject-6eeaf.firebaseio.com",
  projectId: "fir-chatproject-6eeaf",
  storageBucket: "fir-chatproject-6eeaf.appspot.com",
  messagingSenderId: "712907238833"
};
export const firebaseRef = Firebase.initializeApp(config)
