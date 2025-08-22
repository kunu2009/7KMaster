
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  "projectId": "k-master-dashboard",
  "appId": "1:485383895376:web:e6d1ef7bfb065ed0295455",
  "storageBucket": "k-master-dashboard.firebasestorage.app",
  "apiKey": "AIzaSyDO9CF0zY02uR8ZCED6Zx21ldESwUcossw",
  "authDomain": "k-master-dashboard.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "485383895376"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
