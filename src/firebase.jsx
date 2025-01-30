import firebase from "firebase/compat/app";
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDUEHxO3D3Gpnumh0GjKDBdoKrgE5r4tYw",
    authDomain: "appointment-e2821.firebaseapp.com",
    projectId: "appointment-e2821",
    storageBucket: "appointment-e2821.firebasestorage.app",
    messagingSenderId: "948835328390",
    appId: "1:948835328390:web:4b1efd4c2eb6e8faf74c07"
  };

  
  const app = firebase.initializeApp(firebaseConfig);
  const auth = app.auth()

  export {auth}
  export default firebase