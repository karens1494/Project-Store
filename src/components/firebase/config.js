import firebaseApp from "firebase/app";
import firebase from "firebase";

// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: process.env.REACT_APP_F_API_KEY,
  authDomain: process.env.REACT_APP_F_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_F_PROJECT_ID,
  storageBucket: process.env.REACT_APP_F_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_F_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_F_APP_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const authFacebook = new firebase.auth.FacebookAuthProvider().addScope("public_profile");
export const authGoogle = new firebase.auth.GoogleAuthProvider().addScope(
  "https://www.googleapis.com/auth/userinfo.profile"
);


export const timestamp = firebase.firestore.Timestamp

export const ref = firebase.database().ref();

export const users = firebase.firestore().collection("users");

export const firebaseAuth = firebase.auth;

export const userSignOut = firebase.auth().signOut;
export const firestoreDB = firebaseApp.firestore();
