// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMnDl8XwrAxSC94l_UlkQ8X9Zy40AKLy8",
  authDomain: "media-app-dd439.firebaseapp.com",
  projectId: "media-app-dd439",
  storageBucket: "media-app-dd439.appspot.com",
  messagingSenderId: "429792323595",
  appId: "1:429792323595:web:06c346188108f9c8ab7f0e",
  measurementId: "G-VTQ8S5DGJP"
};

// Initialize Firebase
const apps = getApps()
let app;
if (!apps.length) {
  app = initializeApp(firebaseConfig);
}

const auth = initializeAuth(app,  {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
const storage = getStorage(app)

export { app, auth, storage }