import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_F_API_KEY,
  authDomain: process.env.REACT_APP_F_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_F_PROJECT_ID,
  storageBucket: process.env.REACT_APP_F_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_F_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_F_APP_ID,
};

firebase.initializeApp(firebaseConfig);

//export const authFacebook = firebaseApp.auth.FacebookAuthProvider().addScope("public_profile");
const authGoogle = new firebase.auth.GoogleAuthProvider().addScope("https://www.googleapis.com/auth/userinfo.profile");
const firestoreDB = firebase.firestore();
const userSignOut = () => firebase.auth().signOut();
const firebaseAuth = firebase.auth;
const timestamp = firebase.firestore.Timestamp;

export { firestoreDB, userSignOut, firebaseAuth, authGoogle, timestamp };

// Initialize Firebase
