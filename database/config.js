import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAkUZRjBddcAtF4NginQeoerqXDZtgzE6U",
  authDomain: "imai-36047.firebaseapp.com",
  databaseURL: "https://imai-36047-default-rtdb.firebaseio.com",
  projectId: "imai-36047",
  storageBucket: "imai-36047.appspot.com",
  messagingSenderId: "566876038224",
  appId: "1:566876038224:web:ddf1f442422565f9569d55",
  measurementId: "G-CWEYNW2CFS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;