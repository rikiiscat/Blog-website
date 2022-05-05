import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBFbGDPyzgWCgyqDDP28gkGyIRMw8jHOkQ",
  authDomain: "web-production-74721.firebaseapp.com",
  databaseURL: "https://web-production-74721-default-rtdb.firebaseio.com",
  projectId: "web-production-74721",
  storageBucket: "web-production-74721.appspot.com",
  messagingSenderId: "820362325090",
  appId: "1:820362325090:web:870d28794494de233e753b"
});

export const auth = app.auth()
export default app
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();