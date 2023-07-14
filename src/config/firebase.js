import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDOaDWZAqb-1wZ-u8Zohem7FcRF4FsQTL8",
  authDomain: "file-management-system-831c3.firebaseapp.com",
  projectId: "file-management-system-831c3",
  storageBucket: "file-management-system-831c3.appspot.com",
  messagingSenderId: "1059678985533",
  appId: "1:1059678985533:web:55ff7f725fcb986a733954",
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
