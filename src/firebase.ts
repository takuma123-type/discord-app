import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD5B0_XMQl23H-jSuhoLQhlQrgPheBkY0Y",
  authDomain: "discode-app.firebaseapp.com",
  projectId: "discode-app",
  storageBucket: "discode-app.appspot.com",
  messagingSenderId: "948899972295",
  appId: "1:948899972295:web:b83ccd54dfda6eb01b2ae2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider, db};