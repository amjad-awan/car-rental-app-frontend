
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyCB9Mv6lHWgHP9sybZsFlIWfUEOG8LKqvg",
    authDomain: "vehicle-rent-app.firebaseapp.com",
    projectId: "vehicle-rent-app",
    storageBucket: "vehicle-rent-app.appspot.com",
    messagingSenderId: "300851390323",
    appId: "1:300851390323:web:9b492d2b2e800b1ebcc706",
  };


  const app = initializeApp(firebaseConfig);
  export const auth=getAuth(app)

  export default app 
