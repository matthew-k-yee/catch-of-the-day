import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBscK7Sqapkwo_JOe0vebEfFRu0hUk1qB8",
  authDomain: "catch-of-the-day-matt-yee.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-matt-yee.firebaseio.com"
})

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp }

export default base